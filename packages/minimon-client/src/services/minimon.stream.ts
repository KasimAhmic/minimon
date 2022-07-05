export class MinimonStream {
  private retries: number;
  private connected: boolean;
  private streamUrl: string | undefined;
  private eventSource: EventSource | undefined;

  private readonly maxRetries: number;
  // private readonly subscriptions: Record<string, EventSubscription[]>;

  constructor() {
    this.retries = 0;
    this.connected = false;
    this.maxRetries = 5;
    // this.subscriptions = {};
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

  subscribe(): symbol {
    return Symbol();
  }

  unsubscribe(): void {}

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

  private handleMessage(msg: MessageEvent): void {}
}
