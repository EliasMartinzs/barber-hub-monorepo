import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import type { AuthInstance } from 'src/better-auth';
import { FinishRegisterCustomeDto } from 'src/client/dto/finish-register-customer.dto.ts';
import { AUTH_INSTANCE } from 'src/common/auth/auth';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { handleError } from 'src/errors/handle-error';
@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AUTH_INSTANCE) private readonly auth: AuthInstance,
  ) {}

  async finishRegisterCustomer(
    req: Request,
    id: string,
    body: FinishRegisterCustomeDto,
  ) {
    if (!id) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!body.tenantId) {
      throw new NotFoundException('Barbearia não encontrada');
    }

    try {
      await this.auth.api.setPassword({
        body: {
          newPassword: body.password,
        },
        headers: req.headers as any,
      });
    } catch (e) {
      handleError(e);
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.membership.upsert({
          where: {
            userId_tenantId: {
              userId: id,
              tenantId: body.tenantId,
            },
          },
          update: {},
          create: {
            role: 'CLIENT',
            tenantId: body.tenantId,
            userId: id,
          },
        });
        await tx.customer.create({
          data: {
            name: body.name as string,
            tenantId: body.tenantId,
            userId: id,
            phone: body.phone,
          },
        });
      });
    } catch (e) {
      handleError(e);
    }
  }
}
