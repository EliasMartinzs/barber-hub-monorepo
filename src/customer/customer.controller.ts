import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentTenant } from 'src/common/auth/decorators/current-tenant.decorator';
import { AuthGuard } from 'src/common/auth/guards/auth.guard';
import { PermissionGuard } from 'src/rbac/guards/permission.guard';
import { RequirePermission } from 'src/rbac/require-permission';
import { CustomerService } from './customer.service';

@Controller('client')
export class CustomerController {
  constructor(private readonly CustomerService: CustomerService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @RequirePermission('view:customer')
  @Get('/')
  async getAll(@CurrentTenant() tenantId: string) {
    return await this.CustomerService.getAll(tenantId);
  }
}
