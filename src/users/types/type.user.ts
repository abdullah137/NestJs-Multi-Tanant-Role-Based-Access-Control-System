import { UsersToRoles, Role } from '@prisma/client';
export type FormattedResult = {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  applicationId: string;
  userToRoles: UsersToRoles[];
  permissions: Set<string>;
  roles: Role[];
};
