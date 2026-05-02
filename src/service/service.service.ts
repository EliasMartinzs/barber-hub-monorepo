import { CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { handlePrismaError } from 'src/common/prisma/errors/handle-prisma-error';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { s3Client } from 'src/common/S3/s3.service';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import { EditServiceDto } from 'src/service/dto/edit-service.dto';
import { GetServicesQueryDto } from 'src/service/dto/get-service-query.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllService(tenantId: string, query: GetServicesQueryDto) {
    try {
      const { limit, page, isActive } = query;

      const where: any = {
        tenantId,
        ...(typeof isActive === 'boolean' && { isActive }),
      };

      const [data, total] = await this.prisma.$transaction([
        this.prisma.service.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            tenantId: true,
            description: true,
            name: true,
            price: true,
            durationInMinutes: true,
            isActive: true,
            imageUrl: true,
            order: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        this.prisma.service.count({ where }),
      ]);

      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (e) {
      handlePrismaError(e);
    }
  }

  async getServiceById(id: string) {
    try {
      const result = await this.prisma.service.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          tenantId: true,
          description: true,
          name: true,
          price: true,
          durationInMinutes: true,
          isActive: true,
          imageUrl: true,
          order: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!result) {
        throw new NotFoundException('Serviço não encontrado');
      }

      return result;
    } catch (e) {
      handlePrismaError(e);
    }
  }

  async createService(tenantId: string, service: CreateServiceDto) {
    try {
      let newImageUrl = service.imageKey;

      if (service.imageKey?.startsWith('tmp/')) {
        const newKey = service.imageKey.replace('tmp/', '');

        await s3Client.send(
          new CopyObjectCommand({
            Bucket: process.env.AWS_BUCKET!,
            CopySource: `${process.env.AWS_BUCKET}/${service.imageKey}`,
            Key: newKey,
          }),
        );

        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET!,
            Key: service.imageKey,
          }),
        );

        newImageUrl = `${process.env.AWS_PUBLIC_URL}/${newKey}`;
      }

      return await this.prisma.service.create({
        data: {
          tenantId,
          name: service.name,
          description: service.description,
          price: service.price,
          durationInMinutes: service.durationInMinutes,
          isActive: service.isActive,
          order: service.order,
          imageUrl: newImageUrl,
        },
      });
    } catch (e) {
      handlePrismaError(e);
    }
  }

  async editService(id: string, service: EditServiceDto) {
    try {
      let newImageUrl = service.imageKey;

      if (service.imageKey?.startsWith('tmp/')) {
        const newKey = service.imageKey.replace('tmp/', '');

        await s3Client.send(
          new CopyObjectCommand({
            Bucket: process.env.AWS_BUCKET!,
            CopySource: `${process.env.AWS_BUCKET}/${service.imageKey}`,
            Key: newKey,
          }),
        );

        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET!,
            Key: service.imageKey,
          }),
        );

        newImageUrl = `${process.env.AWS_PUBLIC_URL}/${newKey}`;
      }

      return await this.prisma.service.update({
        where: { id },
        data: {
          name: service.name,
          description: service.description,
          price: service.price,
          durationInMinutes: service.durationInMinutes,
          isActive: service.isActive,
          order: service.order,
          imageUrl: newImageUrl,
        },
      });
    } catch (e) {
      handlePrismaError(e);
    }
  }

  async deleteService(id: string) {
    try {
      return await this.prisma.service.delete({
        where: { id },
      });
    } catch (e) {
      handlePrismaError(e);
    }
  }

  async updateStatus(serviceId: string, isActive: boolean) {
    if (!serviceId) {
      throw new BadRequestException('Id invalido');
    }

    if (typeof isActive !== 'boolean') {
      throw new BadRequestException('Status invalido');
    }

    return this.prisma.service.update({
      where: { id: serviceId },
      data: { isActive },
    });
  }
}
