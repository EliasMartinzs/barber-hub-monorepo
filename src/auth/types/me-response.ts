import { $Enums, Tenant, User } from 'src/generated/prisma';

export type MeResponse = {
  user: User;
  tenant: Tenant;
  role: $Enums.MembershipRole;
};
