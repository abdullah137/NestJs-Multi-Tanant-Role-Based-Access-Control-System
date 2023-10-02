import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserLogic } from './logic/user.logic';
import { RolesService } from 'src/roles/roles.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [UsersService, JwtStrategy, RolesService, UserLogic],
  controllers: [UsersController],
})
export class UsersModule {}
