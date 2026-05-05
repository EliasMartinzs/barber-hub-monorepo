import { Global, Module } from '@nestjs/common';
import { AUTH_INSTANCE } from '../common/auth/auth';
import { PrismaModule } from '../common/prisma/prisma.module';
import { PrismaService } from '../common/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { magicLink } from 'better-auth/plugins';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

const isProd = process.env.NODE_ENV === 'production';

@Global()
@Module({
  imports: [PrismaModule, MailModule],
  providers: [
    {
      provide: AUTH_INSTANCE,
      useFactory: (prisma: PrismaService, mail: MailService) => {
        return betterAuth({
          database: prismaAdapter(prisma, { provider: 'postgresql' }),
          appName: process.env.APP_NAME ?? 'YOUR_APP',
          secret: process.env.BETTER_AUTH_SECRET ?? 'secret',
          baseURL: process.env.BETTER_AUTH_BASE_URL || 'http://localhost:3000',
          emailAndPassword: {
            enabled: true,
            requireEmailVerification: true,
            minPasswordLength: 8,
            maxPasswordLength: 64,
            revokeSessionsOnPasswordReset: true,
            sendResetPassword: async ({ user, url }) => {
              const fixedUrl = decodeURIComponent(url);

              await mail.sendEmail({
                to: user.email,
                subject: 'Reset your password',
                template: 'signup-confirmation-template',
                context: {
                  name: user.name,
                  url: fixedUrl,
                },
              });
            },
          },
          user: {
            deleteUser: {
              enabled: true,
            },
          },
          plugins: [
            magicLink({
              sendMagicLink: async ({ email, url }) => {
                await mail.sendEmail({
                  to: email,
                  subject: 'Magic',
                  template: 'magic-link-template',
                  context: {
                    magicLink: url,
                    expirationMinutes: '15',
                  },
                });
              },
            }),
          ],
          emailVerification: {
            sendOnSignUp: true,

            sendVerificationEmail: async ({ user, url }) => {
              const fixedUrl = decodeURIComponent(url);

              await mail.sendEmail({
                to: user.email,
                subject: 'Verify your email address',
                template: 'send-email-verification-template',
                context: {
                  name: user.name,
                  url: fixedUrl,
                },
              });
            },
          },
          session: {
            expiresIn: 60 * 60 * 24 * 7,
            updateAge: 60 * 40 * 24,
            freshAge: 60 * 60 * 2,
          },
          advanced: {
            cookies: {
              session_token: {
                name: 'better-auth.session_token',
                attributes: {
                  httpOnly: true,
                  sameSite: isProd ? 'none' : 'lax',
                  secure: isProd,
                  path: '/',
                },
              },
            },
          },
          trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
        });
      },
      inject: [PrismaService, MailService],
    },
    AuthService,
  ],
  controllers: [AuthController],
  exports: [AUTH_INSTANCE, AuthService],
})
export class AuthModule {}
