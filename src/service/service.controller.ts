import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { type Request } from 'express';
import { ArcjetService } from 'src/arcjet/arcjet.service';
import { CurrentTenant } from 'src/common/auth/decorators/current-tenant.decorator';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { PermissionGuard } from 'src/rbac/guards/permission.guard';
import { RequirePermission } from 'src/rbac/require-permission';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import { EditServiceDto } from 'src/service/dto/edit-service.dto';
import { GetServicesQueryDto } from 'src/service/dto/get-service-query.dto';
import { UpdateStatusDto } from 'src/service/dto/update-status.dto';
import {
  GetServicesResponse,
  ServiceResponse,
} from 'src/service/types/service-response';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly arcjet: ArcjetService,
  ) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('view:service')
  @Get('/')
  async getAll(
    @Query() query: GetServicesQueryDto,
    @CurrentTenant() tenantId: string,
  ): Promise<GetServicesResponse> {
    return await this.serviceService.getAllService(tenantId, query);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('view:service')
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ServiceResponse> {
    return await this.serviceService.getServiceById(id);
  }

  @RequirePermission('create:service')
  @Post('/:slug')
  async create(
    @Req() req: Request,
    @CurrentTenant() tenantId: string,
    @Body() create: CreateServiceDto,
  ): Promise<ServiceResponse> {
    await this.arcjet.rateLimit(
      req,
      'Você já criou muitos serviços. Aguarde 1 minuto.',
    );

    return await this.serviceService.createService(tenantId, create);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('update:service')
  @HttpCode(200)
  @Patch('/:id')
  async edit(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() edit: EditServiceDto,
  ): Promise<{ message: string }> {
    await this.arcjet.rateLimit(
      req,
      'Você já editou muitos serviços. Aguarde 1 minuto.',
    );

    await this.serviceService.editService(id, edit);

    return {
      message: 'Serviço editado com sucesso',
    };
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('delete:service')
  @HttpCode(200)
  @Delete('/:id')
  async delete(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    await this.arcjet.rateLimit(
      req,
      'Você já deletou muitos serviços. Aguarde 1 minuto.',
    );

    await this.serviceService.deleteService(id);

    return {
      message: 'Serviço removido com sucesso',
    };
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('update:service')
  @Patch(':id/status')
  async toggleServicesStatus(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<{ message: string }> {
    await this.arcjet.rateLimit(
      req,
      'Você já editou muitos serviços. Aguarde 1 minuto.',
      {
        max: 25,
      },
    );

    await this.serviceService.updateStatus(id, updateStatusDto.isActive);

    return { message: 'Status atualizado' };
  }
}
