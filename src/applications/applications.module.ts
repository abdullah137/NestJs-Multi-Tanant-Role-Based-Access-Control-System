import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationLogic } from './logic/application.logic';
import { RolesService } from 'src/roles/roles.service';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService, RolesService, ApplicationLogic],
})
export class ApplicationsModule {}
