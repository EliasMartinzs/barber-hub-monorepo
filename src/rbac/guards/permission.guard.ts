import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRE_PERMISSION_KEY } from 'src/rbac/require-permission';
import { hasPermission } from '../rbac.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get<string>(
      REQUIRE_PERMISSION_KEY,
      context.getHandler(),
    );

    if (!permission) return true;

    const request = context.switchToHttp().getRequest();

    const membership = request.membership;

    if (!membership) {
      throw new ForbiddenException('Membership not loaded');
    }

    if (!membership.role) {
      throw new ForbiddenException('Role not found for tenant');
    }

    const allowed = hasPermission(membership.role, permission);

    if (!allowed) {
      throw new ForbiddenException('Insufficient permission');
    }

    request.role = membership.role;
    request.tenantId = membership.tenantId;

    return true;
  }
}
