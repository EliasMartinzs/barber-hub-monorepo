import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password!: string;

  @IsBoolean()
  @IsOptional()
  rememberMe!: boolean;

  @IsString()
  @IsOptional()
  callbackURL!: string;
}
