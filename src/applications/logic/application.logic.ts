import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApplicationsService } from '../applications.service';
import { ApplicationDto } from '../dtos/applications.dto';
import { RolesService } from 'src/roles/roles.service';
import {
  ALL_PERMISSIONS,
  SYSTEM_ROLES,
  USER_ROLE_PERMISSIONS,
} from 'src/config/permissions';

@Injectable()
export class ApplicationLogic {
  constructor(
    private roleService: RolesService,
    private applicationService: ApplicationsService,
  ) {}

  async createApplication(payload: ApplicationDto) {
    const application = await this.applicationService.createApplication(
      payload,
    );

    const superAdminRolePromise = await this.roleService.createRole({
      applicationId: application.appId,
      name: SYSTEM_ROLES.SUPER_ADMIN,
      permisions: ALL_PERMISSIONS as unknown as Array<string>,
    });

    const applicationUserRolePromise = await this.roleService.createRole({
      applicationId: application.appId,
      name: SYSTEM_ROLES.APPLICATION_USER,
      permisions: USER_ROLE_PERMISSIONS,
    });

    const [superAdminRole, applicationUserRole] = await Promise.allSettled([
      superAdminRolePromise,
      applicationUserRolePromise,
    ]);

    if (superAdminRole.status === 'rejected') {
      throw new InternalServerErrorException({
        status: false,
        message: 'Error creating super admin role',
        error: 'INTERNAL_SERVER_ERROR',
      });
    }

    if (applicationUserRole.status === 'rejected') {
      throw new InternalServerErrorException({
        status: false,
        message: 'Error creating applicaion user role',
        error: 'INTERNAL_SERVER_ERROR',
      });
    }

    return {
      status: true,
      message: 'Success! An Application has been created successfully',
      data: {
        application,
        superAdminRole: superAdminRole.value,
        applicationUserRole: applicationUserRole.value,
      },
    };
  }

  async getApplicationLogic() {
    const applications = await this.applicationService.getApplications();
    return {
      message: 'Data Fetched Successfully!!!',
      status: true,
      data: applications,
    };
  }
}
