import { Module } from '@nestjs/common';
import { ArcjetModule } from 'src/arcjet/arcjet.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [PrismaModule, ArcjetModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
