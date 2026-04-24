import { Inject, Injectable } from '@nestjs/common';
import { APIError } from 'better-auth/api';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import type { BetterAuth } from '../better-auth';
import { AUTH_INSTANCE } from '../common/auth/auth';

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_INSTANCE) private readonly auth: BetterAuth) {}

  async register(body: RegisterDto) {
    try {
      return await this.auth.api.signUpEmail({
        returnHeaders: true,
        body: {
          ...body,
        },
      });
    } catch (e) {
      if (e instanceof APIError) {
        return { error: { message: e.message, status: e.status } };
      }
      throw e;
    }
  }

  async login(body: LoginDto) {
    try {
      return await this.auth.api.signInEmail({
        returnHeaders: true,
        body,
      });
    } catch (e) {
      if (e instanceof APIError) {
        return { error: { message: e.message, status: e.status } };
      }
      throw e;
    }
  }

  async logout(headers: Headers) {
    return await this.auth.api.signOut({
      returnHeaders: true,
      headers,
    });
  }

  async getSession(headers: Headers) {
    return await this.auth.api.getSession({ headers });
  }
}
