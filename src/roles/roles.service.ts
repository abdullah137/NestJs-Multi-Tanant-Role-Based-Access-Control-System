import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { rolesType, RolesDto } from './dtos/roles.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async createRole(payload: RolesDto) {
    try {
      const roles = await this.prisma.role.create({
        data: {
          name: payload.name,
          permissions: payload.permisions,
          application_id: payload.applicationId,
        },
      });
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async getRoles() {
    try {
      const roles = await this.prisma.role.findMany({});
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async getRoleToUser() {
    try {
      const roles = await this.prisma.usersToRoles.findMany({});
      return roles;
    } catch (error) {
      throw error;
    }
  }

  async getRoleByName({
    name,
    applicationId,
  }: {
    name: string;
    applicationId: string;
  }) {
    try {
      const results = await this.prisma.role.findMany({
        where: {
          name: name,
          application_id: applicationId,
        },
        include: {
          application: true,
          usersToRoles: true,
        },
      });
      return results[0];
    } catch (error) {
      throw error;
    }
  }

  async assignRoleToUser({
    roleId,
    userId,
    applicationId,
  }: {
    roleId: string;
    userId: string;
    applicationId: string;
  }) {
    try {
      const assignUser = await this.prisma.usersToRoles.create({
        data: {
          roledId: roleId,
          userId,
          applicationId,
        },
      });
      return assignUser;
    } catch (error) {
      throw error;
    }
  }
}
