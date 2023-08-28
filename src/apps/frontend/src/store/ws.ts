
import { v4 as uuidv4 } from 'uuid';

export type wsEventHandler = (data: unknown) => void;

export default class WS {
  socket: WebSocket | undefined;
  subscriptions: Map<string, wsEventHandler[]>;

  constructor() {
    this.subscriptions = new Map();
  }

  init(uri: string) {
    this.socket = new WebSocket(uri);
    this.socket.addEventListener('open', (event) => {
      console.info('Socket connected')
      this.handleEvent('open');
    });

    this.socket.addEventListener('message', (event) => {
      const { ev, data } = JSON.parse(event.data);
      this.handleEvent(ev, data);
    });

    this.socket.addEventListener('error', (err) => {
      console.error(err);
      this.handleEvent('error');
    });

    this.socket.addEventListener('close', () => {
      console.log('socket closed');
      this.handleEvent('close');
    })
  }

  async emit(ev: string, msg: string, expectResponse = false) {

    return new Promise((resolve, reject) => {
      console.info(`Emitting message: ${JSON.stringify({ ev, msg })}`);

      if (this.socket === undefined) {
        console.warn(`ws not initialized`);
        return reject('WS not initialized');
      }

      if (this.socket.readyState !== WebSocket.OPEN) {
        console.log('not ready yet', ev, msg);
        reject(new Error('Not ready to send'));
      }

      if (expectResponse) {
        const rspKey = `${ev}|${uuidv4()}`;
        this.on(rspKey, (rspData) => {
          this.subscriptions.delete(rspKey);
          resolve(rspData);
        });
        this.socket.send(JSON.stringify({ ev, msg, replyTo: rspKey }));
      } else {
        this.socket.send(JSON.stringify({ ev, msg, replyTo: false }));
        resolve(null);
      }
    });
  }

  handleEvent(ev: string, data?: unknown) {
    const hndlrs = this.subscriptions.get(ev);
    if (hndlrs === undefined) return;

    hndlrs.forEach((fn: wsEventHandler) => fn.call(this, data));
    if (hndlrs.length === 0) {
      console.warn(`No handlers registered for ev ${ev}`);
    }
  }

  on(ev: string, fn: wsEventHandler) {
    const handlers = this.subscriptions.get(ev) || [];
    this.subscriptions.set(ev, [...handlers, fn]);
  }

  off(ev: string, fn: wsEventHandler) {
    const subs: wsEventHandler[] | undefined = this.subscriptions.get(ev);

    if (subs === undefined) {
      console.warn(`ev:${ev} has no handler registered`);
      return;
    }

    const idx = subs.findIndex((f: wsEventHandler) => (f === fn));
    subs.splice(idx, 1);

    if (subs.length === 0) {
      this.subscriptions.delete(ev)
    } else {
      this.subscriptions.set(ev, subs);
    }
  }

  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}