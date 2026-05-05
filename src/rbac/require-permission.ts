import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/rbac/permissions';

export const REQUIRE_PERMISSION_KEY = 'permission';

export const RequirePermission = (permission: Permission) =>
  SetMetadata(REQUIRE_PERMISSION_KEY, permission);
