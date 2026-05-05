import { ROLE_PERMISSIONS, Role } from './roles';

export function hasPermission(role: Role, permission: string) {
  const permissions = ROLE_PERMISSIONS[role];

  return permissions.includes('*') || permissions.includes(permission);
}
