import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentTenant } from 'src/common/auth/decorators/current-tenant.decorator';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import { EditServiceDto } from 'src/service/dto/edit-service.dto';
import { ServiceResponse } from 'src/service/types/service-response';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getAll(@CurrentTenant() tenantId: string): Promise<ServiceResponse[]> {
    return await this.serviceService.getAllService(tenantId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ServiceResponse> {
    return await this.serviceService.getServiceById(id);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(
    @CurrentTenant() tenantId: string,
    @Body() create: CreateServiceDto,
  ): Promise<ServiceResponse> {
    return await this.serviceService.createService(tenantId, create);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Patch('/:id')
  async edit(
    @Param('id') id: string,
    @Body() edit: EditServiceDto,
  ): Promise<{ message: string }> {
    await this.serviceService.editService(id, edit);

    return {
      message: 'Serviço editado com sucesso',
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.serviceService.deleteService(id);

    return {
      message: 'Serviço removido com sucesso',
    };
  }
}
