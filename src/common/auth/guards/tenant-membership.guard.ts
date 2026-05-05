import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TenantMembershipGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const session = request.session;
    const slug = request.params.slug;

    if (!session?.user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!slug) {
      throw new ForbiddenException('Slug missing');
    }

    const membership = await this.prisma.membership.findFirst({
      where: {
        userId: session.user.id,
        tenant: {
          slug,
        },
      },
      include: {
        tenant: true,
      },
    });

    if (!membership) {
      throw new ForbiddenException('No access to this tenant');
    }

    request.membership = membership;
    request.tenantId = membership.tenantId;

    return true;
  }
}
