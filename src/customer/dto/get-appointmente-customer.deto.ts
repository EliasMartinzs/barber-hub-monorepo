import { IsOptional, IsString } from 'class-validator';

export class GetCustomerAppointmentsQueryDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
