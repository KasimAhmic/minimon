import { IMinimonEvent, IReloadEvent } from '@ahmic/minimon-core';

export interface EventSubscription {
  id: symbol;
  callback: (data: unknown) => void;
}

export class MinimonStream {
  private retries: number;
  private connected: boolean;
  private streamUrl: string | undefined;
  private eventSource: EventSource | undefined;

  private readonly maxRetries: number;
  private readonly subscriptions: Record<string, EventSubscription[]>;

  constructor() {
    this.retries = 0;
    this.connected = false;
    this.maxRetries = 5;
    this.subscriptions = {};
  }

  isConnected(): boolean {
    return this.connected;
  }

  connect(url: string): void {
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
    if (this.retries < this.maxRetries) {
      try {
        this.disconnect();
      } catch {}

      if (this.streamUrl) {
        this.connect(this.streamUrl);
      }
    } else {
      console.error('Max retries exceeded. Unable to connect to event stream.');
    }
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
  }

  private handleMessage(msg: MessageEvent): void {
    const message: IMinimonEvent = JSON.parse(msg.data);

    const { type, data } = message;

    if (!(type in this.subscriptions)) return;

    for (const subscription of this.subscriptions[type]) {
      try {
        subscription.callback(data);
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
