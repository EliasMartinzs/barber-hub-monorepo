import { IsEmail, IsString } from 'class-validator';

export class SendVerificationDto {
  @IsEmail()
  email!: string;

  @IsString()
  callbackURL!: string;
}
