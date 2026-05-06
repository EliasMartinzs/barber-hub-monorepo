import { ArcjetModule, detectBot, shield } from '@arcjet/nest';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ContextMiddleware } from 'src/common/middlewares/context.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { AuthMiddleware } from './common/auth/auth.middleware';
import { PrismaModule } from './common/prisma/prisma.module';
import { PrismaService } from './common/prisma/prisma.service';
import { JobsModule } from './jobs/jobs.module';
import { MailModule } from './mail/mail.module';
import { ServiceModule } from './service/service.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ArcjetModule.forRoot({
      isGlobal: true,
      key: process.env.ARCJET_KEY!,
      characteristics: ['ip.src'],
      rules: [
        shield({ mode: 'LIVE' }),
        detectBot({
          mode: 'LIVE',
          allow: ['CATEGORY:SEARCH_ENGINE'],
        }),
      ],
    }),
    AuthModule,
    PrismaModule,
    MailModule,
    ServiceModule,
    UploadModule,
    JobsModule,
    ClientModule,
    ArcjetModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, ContextMiddleware).forRoutes('*');
  }
}
