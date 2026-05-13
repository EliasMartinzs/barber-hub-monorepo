import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CurrentTenant } from 'src/common/auth/decorators/current-tenant.decorator';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { GetAllCustomersQueryDto } from 'src/customer/dto/get-all-customers-query.dto';
import { GetCustomerAppointmentsQueryDto } from 'src/customer/dto/get-appointmente-customer.deto';
import { GetAllCustomersResponse } from 'src/customer/types/get-all-customers.response';
import { CustomerById } from 'src/customer/types/get-customer-by-id.response';
import { PermissionGuard } from 'src/rbac/guards/permission.guard';
import { RequirePermission } from 'src/rbac/require-permission';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('view:customer')
  @Get('/')
  async getAll(
    @CurrentTenant() tenantId: string,
    @Query() query: GetAllCustomersQueryDto,
  ): Promise<GetAllCustomersResponse> {
    return await this.customerService.getAll(tenantId, query);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('view:customer')
  @Get('/:id')
  async getById(
    @CurrentTenant() tenantId: string,
    @Param('id') id: string,
  ): Promise<CustomerById | null> {
    return await this.customerService.getById(id, tenantId);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('view:customer')
  @Get('/:id/profile')
  async getProfile(@CurrentTenant() tenantId: string, @Param('id') id: string) {
    return await this.customerService.getProfile(id, tenantId);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('view:customer')
  @Get(':id/appointments')
  async getAppointments(
    @CurrentTenant() tenantId: string,

    @Param('id') id: string,

    @Query()
    query: GetCustomerAppointmentsQueryDto,
  ) {
    return this.customerService.getAppointments(id, tenantId, query);
  }
}
