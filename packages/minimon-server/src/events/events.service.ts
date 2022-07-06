import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { MinimonEvent } from './minimon.event';

export interface MinimonMessage {
  data: MinimonEvent;
}

@Injectable()
export class EventsService {
  private readonly message: Subject<MinimonMessage>;

  constructor() {
    this.message = new Subject<MinimonMessage>();
  }

  subscribe() {
    return this.message.asObservable();
  }

  emitEvent(event: MinimonEvent) {
    this.message.next({ data: event });
  }
}
