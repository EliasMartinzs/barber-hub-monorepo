import { ARCJET, type ArcjetNest, fixedWindow } from '@arcjet/nest';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { type Request } from 'express';

@Injectable()
export class ArcjetService {
  constructor(@Inject(ARCJET) private readonly arcjet: ArcjetNest) {}

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
          max: options?.max ?? 5,
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
