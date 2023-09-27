import { Injectable } from '@nestjs/common';
import {
  UserCreateDto,
  UserLoginDto,
  AssignRoleToUserDto,
} from './dtos/user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: UserCreateDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByApplication(applicationId: string) {
    try {
      const result = await this.prisma.user.findMany({
        where: {
          applicationId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
