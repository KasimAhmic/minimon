import { SystemVitals } from '@ahmic/minimon-core';
import { Controller, Get } from '@nestjs/common';
import { VitalsService } from './vitals.service';

@Controller('vitals')
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  @Get()
  currentVitals(): SystemVitals {
    return this.vitalsService.getVitals();
  }
}
