import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RolesDto } from '../dtos/roles.dto';
import { RolesService } from 'src/roles/roles.service';
import { Request } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class RolesLogic {
  constructor(private rolesService: RolesService) {}

  async createRoles(payload: RolesDto) {
    const { name, applicationId, permisions } = payload;
    const createRole = this.rolesService.createRole({
      name,
      permisions,
      applicationId: applicationId,
    });

    return createRole;
  }
}
