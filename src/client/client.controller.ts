import { Body, Controller, Param, Patch, Req } from '@nestjs/common';
import type { Request } from 'express';
import { FinishRegisterCustomeDto } from 'src/client/dto/finish-register-customer.dto.ts';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Patch(':id/customer')
  async finishRegisterCustomer(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: FinishRegisterCustomeDto,
  ): Promise<{
    message: string;
  }> {
    await this.clientService.finishRegisterCustomer(req, id, body);

    return { message: 'Cadastro concluido' };
  }
}
