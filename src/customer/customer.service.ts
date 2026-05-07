import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { handleError } from 'src/errors/handle-error';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(tenantId: string) {
    const where: any = {
      tenantId,
    };

    try {
      const data = await this.prisma.customer.findMany({
        where,
        select: {
          id: true,
          name: true,
          phone: true,
          notes: true,
          barberId: true,
        },
      });

      return {
        data,
      };
    } catch (e) {
      handleError(e);
    }
  }
}
