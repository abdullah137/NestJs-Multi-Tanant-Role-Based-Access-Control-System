import { Post, Controller, Get, Body } from '@nestjs/common';
import { RolesDto } from './dtos/roles.dto';
import { RolesService } from './roles.service';
import { RolesLogic } from './logic/roles.logic';
import { GetUser } from '../users/decorator/get-user-decorator';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../users/guard/jwt.guard';
@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService,
    private rolesLogic: RolesLogic,
  ) {}

  @Post('/create')
  @UseGuards(JwtGuard)
  createRole(@Body() body: RolesDto, @GetUser() user) {
    console.log(user);
    return this.rolesLogic.createRoles(body);
  }

  @Get('/all')
  async getAllRoles() {
    return this.rolesService.getRoles();
  }

  @Get('/all-user-to-roles')
  async getAllUserToRoles() {
    return this.rolesService.getRoleToUser();
  }
}
