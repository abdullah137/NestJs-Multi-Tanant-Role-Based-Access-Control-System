import { Post, Controller, Body } from '@nestjs/common';
import { RolesDto } from './dtos/roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post('/create')
  createRole(@Body() body: RolesDto) {}
}
