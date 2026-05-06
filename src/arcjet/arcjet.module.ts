import { Module } from '@nestjs/common';
import { ArcjetController } from './arcjet.controller';
import { ArcjetService } from './arcjet.service';

@Module({
  controllers: [ArcjetController],
  providers: [ArcjetService],
  exports: [ArcjetService],
})
export class ArcjetModule {}
