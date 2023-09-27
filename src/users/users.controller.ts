import {
  Body,
  Post,
  Req,
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  AssignRoleToUserDto,
  UserCreateDto,
  UserLoginDto,
} from './dtos/user.dto';
import { JwtGuard } from './guard/jwt.guard';
import { UserLogic } from './logic/user.logic';
@Controller('users')
export class UsersController {
  constructor(private userLogic: UserLogic) {}

  @Post('create')
  createUser(@Body() body: UserCreateDto) {
    return this.userLogic.createUser(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() body: UserLoginDto) {
    return this.userLogic.login(body);
  }

  @Post('roles')
  @UseGuards(JwtGuard)
  assignUserToRoles(@Body() body: AssignRoleToUserDto) {}
}
