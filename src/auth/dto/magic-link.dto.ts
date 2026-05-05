import { IsEmail, IsString } from 'class-validator';

export class MagicLinkDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  callbackURL!: string;

  @IsString()
  newUserCallbackURL!: string;

  @IsString()
  errorCallbackURL!: string;
}
