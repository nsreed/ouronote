class DummyPort extends EventTarget implements MessagePort {
  onmessage!: ((this: MessagePort, ev: MessageEvent<any>) => any) | null;
  onmessageerror!: ((this: MessagePort, ev: MessageEvent<any>) => any) | null;
  close(): void;
  close(): void;
  close(): void;
  close(): void {
    // throw new Error('Method not implemented.');
  }
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: StructuredSerializeOptions): void;
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: StructuredSerializeOptions): void;
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: StructuredSerializeOptions): void;
  postMessage(message: any, options?: any): void {
    // TODO add fakery here for simple calls
    if (message.cmd) {
      const evt = new MessageEvent('message', {
        data: {
          cmd: message.cmd,
          rseq: message.seq,
          response: null,
        },
      });
      this.dispatchEvent(evt);
    }
    // throw new Error('Method not implemented.');
  }
  start(): void;
  start(): void;
  start(): void;
  start(): void {
    // throw new Error('Method not implemented.');
  }
  // addEventListener<K extends keyof MessagePortEventMap>(
  //   type: K,
  //   listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
  //   options?: boolean | AddEventListenerOptions
  // ): void;
  // addEventListener(
  //   type: string,
  //   listener: EventListenerOrEventListenerObject,
  //   options?: boolean | AddEventListenerOptions
  // ): void;
  // addEventListener<K extends keyof MessagePortEventMap>(
  //   type: K,
  //   listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
  //   options?: boolean | AddEventListenerOptions
  // ): void;
  // addEventListener(
  //   type: string,
  //   listener: EventListenerOrEventListenerObject,
  //   options?: boolean | AddEventListenerOptions
  // ): void;
  // addEventListener<K extends keyof MessagePortEventMap>(
  //   type: K,
  //   listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
  //   options?: boolean | AddEventListenerOptions
  // ): void;
  // addEventListener(
  //   type: string,
  //   listener: EventListenerOrEventListenerObject,
  //   options?: boolean | AddEventListenerOptions
  // ): void;
  // addEventListener(type: any, listener: any, options?: any): void {
  //   // throw new Error('Method not implemented.');
  // }
  // removeEventListener<K extends keyof MessagePortEventMap>(
  //   type: K,
  //   listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
  //   options?: boolean | EventListenerOptions
  // ): void;
  // removeEventListener(
  //   type: string,
  //   listener: EventListenerOrEventListenerObject,
  //   options?: boolean | EventListenerOptions
  // ): void;
  // removeEventListener<K extends keyof MessagePortEventMap>(
  //   type: K,
  //   listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
  //   options?: boolean | EventListenerOptions
  // ): void;
  // removeEventListener(
  //   type: string,
  //   listener: EventListenerOrEventListenerObject,
  //   options?: boolean | EventListenerOptions
  // ): void;
  // removeEventListener<K extends keyof MessagePortEventMap>(
  //   type: K,
  //   listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any,
  //   options?: boolean | EventListenerOptions
  // ): void;
  // removeEventListener(
  //   type: string,
  //   listener: EventListenerOrEventListenerObject,
  //   options?: boolean | EventListenerOptions
  // ): void;
  // removeEventListener(type: any, listener: any, options?: any): void {
  //   // throw new Error('Method not implemented.');
  // }
  // dispatchEvent(event: Event): boolean;
  // dispatchEvent(event: Event): boolean;
  // dispatchEvent(event: Event): boolean;
  // dispatchEvent(event: any): boolean {
  //   return false;
  //   // throw new Error('Method not implemented.');
  // }
}

export class NoopSharedWorker implements SharedWorker {
  port: MessagePort = new DummyPort();
  onerror!: ((this: AbstractWorker, ev: ErrorEvent) => any) | null;
  addEventListener<K extends 'error'>(
    type: K,
    listener: (this: SharedWorker, ev: AbstractWorkerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(type: any, listener: any, options?: any): void {
    // throw new Error('Method not implemented.');
  }
  removeEventListener<K extends 'error'>(
    type: K,
    listener: (this: SharedWorker, ev: AbstractWorkerEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(type: any, listener: any, options?: any): void {
    // throw new Error('Method not implemented.');
  }
  dispatchEvent(event: Event): boolean;
  dispatchEvent(event: Event): boolean;
  dispatchEvent(event: Event): boolean;
  dispatchEvent(event: any): boolean {
    return false;
    // throw new Error('Method not implemented.');
  }
}
