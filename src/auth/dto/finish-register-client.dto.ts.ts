import { IsOptional, IsString } from 'class-validator';

export class FinishRegisterClientDto {
  @IsString()
  tenantId!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  phone!: string;

  @IsString()
  password!: string;
}
