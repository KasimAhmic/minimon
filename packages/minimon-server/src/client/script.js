class EventStream {
  connected;
  eventSource;

  constructor() {
    this.connected = false;
    this.eventSource = undefined;
  }

  disconnect() {
    this.eventSource?.close();
  }

  connect(url) {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => this.handleOpen();
    eventSource.onerror = () => this.handleError();
    eventSource.onmessage = (event) => this.handleMessage(event);

    this.eventSourceUrl = url;
    this.eventSource = eventSource;
  }

  reconnect() {
    try {
      this.disconnect();
    } catch {}

    if (this.eventSourceUrl) {
      this.connect(this.eventSourceUrl);
    }
  }

  handleOpen() {
    this.connected = true;
  }

  handleMessage({ data }) {
    document.getElementById('stats').innerHTML = JSON.stringify(JSON.parse(data), null, 2);
  }

  handleError() {
    this.connected = false;

    setTimeout(() => {
      this.reconnect();
    }, 250);
  }
}

const eventStream = new EventStream();
eventStream.connect('/stats');
