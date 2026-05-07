import {
  ARCJET,
  type ArcjetNest,
  fixedWindow,
  protectSignup,
} from '@arcjet/nest';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { type Request } from 'express';

@Injectable()
export class ArcjetService {
  constructor(@Inject(ARCJET) private readonly arcjet: ArcjetNest) {}

  async signUp(req: Request, email: string) {
    const decision = await this.arcjet
      .withRule(
        protectSignup({
          email: {
            mode: 'LIVE',
            deny: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
          },
          bots: {
            mode: 'LIVE',
            allow: ['CURL'],
          },
          rateLimit: {
            mode: 'LIVE',
            interval: '5m',
            max: 10,
          },
        }),
      )
      .protect(req, { email });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new HttpException(
          'Muitas tentativas. Aguarde alguns minutos.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      if (decision.reason.isBot()) {
        throw new HttpException('Bots não permitidos', 403);
      }

      if (decision.reason.isEmail()) {
        throw new HttpException('Email ou senha inválido', 400);
      }

      throw new HttpException('Acesso negado', 403);
    }

    if (decision.isErrored()) {
      return;
    }
  }

  async rateLimit(
    req: Request,
    message: string,
    options?: {
      max?: number;
      window?: string;
    },
  ) {
    const decision = await this.arcjet
      .withRule(
        fixedWindow({
          mode: 'LIVE',
          window: options?.window ?? '60s',
          max: options?.max ?? 25,
        }),
      )
      .protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new HttpException(message, HttpStatus.TOO_MANY_REQUESTS);
      }

      throw new HttpException('Acesso negado', HttpStatus.FORBIDDEN);
    }

    if (decision.isErrored()) {
      return;
    }
  }
}
