import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationDto } from './dtos/applications.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async createApplication(payload: ApplicationDto) {
    try {
      const createApplication = await this.prisma.application.create({
        data: {
          name: payload.name,
          roleId: 'adafad',
        },
      });
      return createApplication;
    } catch (error) {
      throw error;
    }
  }
}
