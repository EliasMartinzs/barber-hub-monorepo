import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { betterAuthErrorMap } from './better-auth-error.map';
import { prismaErrorMap } from './prisma-error.map';
import {
  isBetterAuthError,
  isHttpException,
  isPrismaError,
} from './type-guards';

export function handleError(error: unknown): never {
  console.error('🔥 ERROR:', error);

  if (isBetterAuthError(error)) {
    const code = error.body?.code as keyof typeof betterAuthErrorMap;

    const message =
      betterAuthErrorMap[code] || error.message || 'Erro de autenticação';

    throw new HttpException(
      {
        message,
        code,
      },
      error.statusCode || 400,
    );
  }

  if (isPrismaError(error)) {
    const message = prismaErrorMap[error.code] || 'Erro no banco de dados';

    throw new HttpException(
      {
        message,
        code: error.code,
      },
      400,
    );
  }

  if (isHttpException(error)) {
    throw new HttpException(error.response, error.status);
  }

  throw new InternalServerErrorException({
    message: 'Erro inesperado',
  });
}
