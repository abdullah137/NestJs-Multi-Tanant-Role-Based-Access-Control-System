import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesLogic } from './logic/roles.logic';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RolesLogic],
})
export class RolesModule {}
