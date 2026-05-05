import 'express';

declare module 'express' {
  interface Request {
    cookies: {
      tenant_slug?: string;
      [key: string]: string | undefined;
    };
  }
}
