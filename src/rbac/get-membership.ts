import { ForbiddenException } from '@nestjs/common';
import { UserResponse } from 'src/auth/types/user-response';

export function getMembership(user: UserResponse, slug: string) {
  const membership = user.memberships?.find((m: any) => m.tenant.slug === slug);

  if (!membership) {
    throw new ForbiddenException('No access to this tenant');
  }

  return membership;
}
