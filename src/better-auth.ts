// common/auth/auth.ts
import type { betterAuth } from 'better-auth';
import type { magicLink } from 'better-auth/plugins';

export const AUTH_INSTANCE = Symbol('AUTH_INSTANCE');

type WithMagicLink = Parameters<typeof betterAuth>[0] & {
  plugins: [ReturnType<typeof magicLink>];
};

export type AuthInstance = ReturnType<typeof betterAuth<WithMagicLink>>;
