export function isBetterAuthError(error: any): error is {
  statusCode: number;
  message: string;
  body?: { code?: string };
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof error.body?.code === 'string'
  );
}

export function isPrismaError(error: any): error is {
  code: string;
  clientVersion: string;
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof error.code === 'string' &&
    'clientVersion' in error
  );
}

export function isHttpException(error: any): error is {
  response: any;
  status: number;
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    'status' in error
  );
}
