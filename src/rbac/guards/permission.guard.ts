import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { hasPermission } from 'src/rbac/rbac.service';
import { REQUIRE_PERMISSION_KEY } from 'src/rbac/require-permission';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get<string>(
      REQUIRE_PERMISSION_KEY,
      context.getHandler(),
    );

    if (!permission) return true;

    const req = context.switchToHttp().getRequest();

    const role = req.role;

    if (!role) {
      throw new ForbiddenException('Usuário sem role no tenant');
    }

    const allowed = hasPermission(role, permission);

    if (!allowed) {
      throw new ForbiddenException('Permissão insuficiente');
    }

    return true;
  }
}
