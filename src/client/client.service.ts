import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Request } from 'express';
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
  }
}
