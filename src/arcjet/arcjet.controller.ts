import { Controller } from '@nestjs/common';
import { ArcjetService } from './arcjet.service';

@Controller('arcjet')
export class ArcjetController {
  constructor(private readonly arcjetService: ArcjetService) {}
}
