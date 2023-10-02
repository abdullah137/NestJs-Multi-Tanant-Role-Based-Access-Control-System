import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { UserCreateDto, UserLoginDto } from '../dtos/user.dto';
import * as argon from 'argon2';
import { SYSTEM_ROLES } from '../../config/permissions';
import { RolesService } from 'src/roles/roles.service';
import { FormattedResult } from '../types/type.user';

@Injectable()
export class UserLogic {
  constructor(
    private roleServie: RolesService,
    private userService: UsersService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async createUser(payload: UserCreateDto) {
    try {
      const user = await this.userService.findUserByEmail(payload.email);
      // if user does not exist throw an exception
      if (user) {
        throw new BadRequestException({
          error: 'USER_EMAIL_EXISTS',
          statusCode: 400,
          status: false,
          message: 'Sorry, user not found',
        });
      }

      const { initialUser, ...data } = payload;

      const roleName = initialUser
        ? SYSTEM_ROLES.SUPER_ADMIN
        : SYSTEM_ROLES.APPLICATION_USER;

      if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
        const appUsers = await this.userService.findUserByApplication(
          payload.applicationId,
        );

        if (appUsers.length > 0) {
          throw new BadRequestException({
            message: 'Application already has super admin user',
            status: false,
            extensions: {
              code: 'APPLICATION_ALRADY_SUPER_USER',
              applicationId: payload.applicationId,
            },
          });
        }
      }

      const role = await this.roleServie.getRoleByName({
        name: roleName,
        applicationId: payload.applicationId,
      });

      // if role not found
      if (!role) {
        throw new NotFoundException({
          error: 'ROLE_NOT_FOUND',
          statusCode: 400,
          status: false,
          message: 'Sorry, role not found',
        });
      }

      const hashPassword = await argon.hash(payload.password);

      const newUser = await this.userService.createUser({
        ...data,
        password: hashPassword,
      });

      // assign a role to the user
      await this.roleServie.assignRoleToUser({
        userId: newUser.id,
        roleId: role.id,
        applicationId: payload.applicationId,
      });

      return {
        message: 'REGISTRATION_SUCCESS',
        status: true,
        data: newUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(payload: UserLoginDto) {
    // find the user by email
    const user = await this.userService.findUserByEmail(payload.email);
    // if user does not exist throw an exception
    if (!user) {
      throw new NotFoundException({
        error: 'USER_NOT_FOUND',
        statusCode: 400,
        status: false,
        message: 'Sorry, user not found',
      });
    }

    // get user by email now
    const getUser = await this.userService.getUserByEmail({
      email: payload.email,
      applicationId: payload.applicationId,
    });

    if (!getUser) {
      throw new BadRequestException({
        status: false,
        message: "Sorry, you've entered an invalid password or email.",
        error: 'LOGIN_FAILURE',
      });
    }

    const formatResult = getUser.reduce((acc, curr) => {
      if (!acc.id) {
        return {
          ...curr,
          permissions: new Set(curr.usersToRoles[0].Role.permissions),
        };
      }

      if (!curr.usersToRoles[0].Role.permissions) {
        return acc;
      }

      for (const permissions of curr.usersToRoles[0].Role.permissions) {
        acc.usersToRoles[0].Role.permissions.push(permissions);
      }

      return acc;
    }, {} as Omit<(typeof getUser)[number], 'permissions'> & {});

    // compare password
    const passwordMatch = await argon.verify(user.password, payload.password);

    if (!passwordMatch) {
      throw new BadRequestException({
        status: false,
        message: "Sorry, you've entered an invalid password or email.",
        error: 'LOGIN_FAILURE',
      });
    }

    return {
      message: "Congratulations! You've successfully logged in.",
      status: true,
      data: {
        ...formatResult,
        permissions: Array.from(formatResult.usersToRoles[0].Role.permissions),
      },
      token: await this.signToken(
        user.id,
        user.email,
        user.applicationId,
        //@ts-ignore
        Array.from(formatResult.permissions),
      ),
    };
  }

  async signToken(
    userId: string,
    email: string,
    applicationId: string,
    scopes: Array<string>,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      applicationId,
      scopes,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return { access_token: token };
  }
}
