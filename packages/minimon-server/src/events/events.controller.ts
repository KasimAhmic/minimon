import { Controller, Sse } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Sse()
  events() {
    return this.eventsService.subscribe();
  }
}
