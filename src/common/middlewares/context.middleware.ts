import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request } from 'express';
import { NextFunction } from 'express';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const session = (req as any).session;

    if (!session?.user) {
      return next();
    }

    const user = session.user;

    const tenantSlug = req.cookies?.tenant_slug;

    const membership = await this.prisma.membership.findFirst({
      where: {
        userId: user.id,
        tenant: {
          slug: tenantSlug,
        },
      },
      include: {
        tenant: true,
      },
    });

    if (membership) {
      (req as any).tenant = membership.tenant;
      (req as any).tenantId = membership.tenantId;
      (req as any).membership = membership;
      (req as any).role = membership.role;
      (req as any).user = user;
    }

    next();
  }
}
