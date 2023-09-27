import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserLogic } from './logic/user.logic';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [UsersService, RolesService, UserLogic],
  controllers: [UsersController],
})
export class UsersModule {}
