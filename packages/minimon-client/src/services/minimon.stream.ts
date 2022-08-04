import { IMinimonEvent, IReloadEvent, noop } from '@ahmic/minimon-core';

export interface EventSubscription {
  id: symbol;
  callback: (data: unknown) => void;
}

export interface MinimonEventHandlers {
  onConnect: () => void;
  onError: () => void;
  onMessage: (msg: MessageEvent) => void;
}

export class MinimonStream {
  private retries: number;
  private connected: boolean;
  private streamUrl: string | undefined;
  private eventSource: EventSource | undefined;
  private eventHandlers: MinimonEventHandlers;

  private readonly maxRetries: number;
  private readonly subscriptions: Record<string, EventSubscription[]>;

  constructor() {
    this.retries = 0;
    this.connected = false;
    this.maxRetries = 5;
    this.subscriptions = {};
    this.eventHandlers = { onConnect: noop, onError: noop, onMessage: noop };
  }

  isConnected(): boolean {
    return this.connected;
  }

  connect(url: string, handlers?: Partial<MinimonEventHandlers>): void {
    if (handlers) {
      this.updateHandlers(handlers);
    }

    const eventSource = new EventSource(url);

    eventSource.onopen = () => this.handleOpen();
    eventSource.onerror = () => this.handleError();
    eventSource.onmessage = (event) => this.handleMessage(event);

    this.streamUrl = url;
    this.eventSource = eventSource;
  }

  disconnect(): void {
    this.eventSource?.close();
  }

  reconnect(): void {
    if (this.retries < this.maxRetries && this.retries >= 0) {
      try {
        this.disconnect();
      } catch {}

      if (this.streamUrl) {
        this.connect(this.streamUrl, this.eventHandlers);
      }
    } else {
      console.error('Max retries exceeded. Unable to connect to event stream.');
    }
  }

  updateHandlers(handlers: Partial<MinimonEventHandlers>): void {
    this.eventHandlers = { ...this.eventHandlers, ...handlers };
  }

  subscribe<T extends IMinimonEvent>(event: T['type'], callback: (data: T['data']) => void): symbol {
    if (!(event in this.subscriptions)) {
      this.subscriptions[event] = [];
    }

    const id = Symbol();

    this.subscriptions[event].push({ id, callback });

    return id;
  }

  unsubscribe(event: string, subscriptionId: symbol): void {
    this.subscriptions[event] = this.subscriptions[event].filter(
      (subscription) => subscription.id !== subscriptionId,
    );
  }

  private handleOpen(): void {
    this.connected = true;
    this.retries = 0;

    this.eventHandlers.onConnect();
  }

  private handleError(): void {
    this.connected = false;

    console.warn(
      `Failed to connect to event stream. Attempting to reconnect now. ${
        this.maxRetries - 1 - this.retries
      } retries remaining`,
    );

    setTimeout(() => {
      this.retries++;
      this.reconnect();
    }, 2000);

    this.eventHandlers.onError();
  }

  private handleMessage(event: MessageEvent): void {
    let type: string;
    let data: unknown;

    try {
      const message: IMinimonEvent = JSON.parse(event.data);

      type = message.type;
      data = message.data;
    } catch (e) {
      console.warn('An error occurred during message deserialization');
      console.warn(event.data);
      console.error(e);

      return;
    }

    if (!(type in this.subscriptions)) return;

    for (const subscription of this.subscriptions[type]) {
      try {
        subscription.callback(data);

        this.eventHandlers.onMessage?.(event);
      } catch (e) {
        console.warn('An error occurred during message handling');
        console.error(e);
      }
    }
  }
}

const minimonStream = new MinimonStream();

// One time subscriptions that never need to be worked with directly
minimonStream.subscribe<IReloadEvent>('reload', () => window.location.reload());

export { minimonStream };
