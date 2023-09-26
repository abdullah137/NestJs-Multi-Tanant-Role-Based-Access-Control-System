import { Controller, Post, Get } from '@nestjs/common';

@Controller('applications')
export class ApplicationsController {
  @Post('')
  createApplication() {}

  @Get('')
  getApplication() {}
}
