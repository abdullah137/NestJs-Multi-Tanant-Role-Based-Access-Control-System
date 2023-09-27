import { Controller, Body, Post, Get } from '@nestjs/common';
import { ApplicationDto } from './dtos/applications.dto';
import { ApplicationLogic } from './logic/application.logic';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationLogic: ApplicationLogic) {}

  @Post('create')
  createApplication(@Body() dto: ApplicationDto) {
    return this.applicationLogic.createApplication(dto);
  }

  @Get('get')
  getApplication() {
    return this.applicationLogic.getApplicationLogic();
  }
}
