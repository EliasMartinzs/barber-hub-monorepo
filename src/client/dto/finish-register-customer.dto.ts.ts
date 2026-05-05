import { IsOptional, IsString } from 'class-validator';

export class FinishRegisterCustomeDto {
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
