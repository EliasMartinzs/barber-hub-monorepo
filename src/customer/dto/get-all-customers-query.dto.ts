import { IsOptional, IsString } from 'class-validator';

export class GetAllCustomersQueryDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
