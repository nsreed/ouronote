/// <reference lib="webworker" />
const KEEPALIVE_INTERVAL = 5 * 1000;
const CLIENT_TIMEOUT = 10 * 1000;
const CLIENT_DEAD = 20 * 1000;

connections = new Set();
pid = getPID();

function getPID() {
  return (Math.random() * 99999999).toFixed(0);
}

class SharedState {
  _session = null;

  set session(value) {
    this._session = value;
  }
  get session() {
    return this._session;
  }

  constructor() {
    this.init();
  }

  async init() {

  }
}

class Connection {
  pid = getPID();
  port;
  lastSeen = Date.now();
  keepaliveInterval;
  seq = 0;

  calls = new Map();

  get sinceLastSeen() {
    return Date.now() - this.lastSeen;
  }

  constructor(port) {
    this.port = port;
    port.start();
    connections.add(this);

    port.onmessage = (message) => this.onMessage(message);
    port.onmessageerror = (err) => this.onMessageError(err);

    this.keepaliveInterval = setInterval(() => this.checkAlive(), KEEPALIVE_INTERVAL);
    this.keepalive();
  }

  async checkAlive() {
    if (this.sinceLastSeen > CLIENT_DEAD) {
      log(`client [${this.pid}] quiet for ${this.sinceLastSeen}ms, disconnecting`);
      this.destroy();
      return;
    }
    if (this.sinceLastSeen > CLIENT_TIMEOUT) {
      this.keepalive();
    }
  }

  async keepalive() {
    const r = await this.command('keepalive');
    this.lastSeen = Date.now();
  }

  async command(name, ...args) {
    const p = new Promise((resolve, reject) => {
      const c = {
        seq: this.seq++,
        cmd: name,
        args
      };
      this.port.postMessage(c);

      this.calls.set(c.seq, (result) => {
        if (result.err) {
          reject(result);
        } else {
          resolve(result.result);
        }
        this.calls.delete(c.seq);
      });
    });
    return p;
  }

  log(msg, ...data) {
    msg = `[${pid}] ${msg}`;
    this.port.postMessage({ msg, data });
  }

  onMessage({ data }) {
    this.lastSeen = Date.now();
    const { cmd, args, seq, rseq } = data;
    if (!cmd || (!seq && !rseq)) {
      this.log('not a command', data);
      return;
    }
    // This is a response
    if (rseq !== undefined && rseq !== null) {
      // TODO clean up unused calls
      const p = this.calls.get(rseq);
      if ('function' === typeof p) {
        p(data);
      }
      return;
    }

    // This is a command
    if ('function' !== typeof this[cmd]) {
      this.log(`cannot execute ${cmd}`);
      this.port.postMessage({
        ...data,
        rseq: seq,
        err: 'no such command'
      });
      return;
    }
  }

  onMessageError(err) {

  }

  destroy() {
    clearInterval(this.keepaliveInterval);
    connections.delete(this);
  }
}

shared = new SharedState();

function announce(msg) {
  connections.forEach(c => c.port.postMessage(msg));
}

function change(name, value) {
  announce({
    change: name,
    value
  })
}

function log(msg, ...data) {
  msg = pid + ': ' + msg;
  announce({
    msg,
    data: data || []
  })
}

self.onconnect = connectEvent => {
  const port = connectEvent.ports[0];
  const state = shared;
  const connection = new Connection(port);

  const commands = {
    getSession: () => state.session,
    setSession: (pair) => {
      if (JSON.stringify(pair) === JSON.stringify(state.session)) {
        log('same session');
        return state.session;
      }
      state.session = pair;
      change('session', state.session);
      return state.session;
    }
  };
  // port.onmessage = ({ data }) => {
  //   cmd = data.cmd;
  //   args = data.args || [];
  //   if (Object.keys(commands).includes(cmd)) {
  //     const result = commands[cmd](...args); // TODO handle errors
  //     port.postMessage({ ...data, result, rseq: data.seq });
  //   } else {
  //     port.postMessage({ ...data, error: 'unrecognized command' });
  //   }
  // }
  // port.onmessageerror = (err) => {
  //   log('message error', JSON.stringify(err));
  // }
  // port.addEventListener('close', () => {
  //   log('close event');
  // })

  log('new connection', connections.size());
};


// function loadGun() {
//   if ('function' === typeof self.importScripts) {
//     announce('importing...');
//     try {
//       self.importScripts('/assets/gun/gun.js');
//     } catch (err) {
//       announce(`Error: ${err.message}`);
//     }
//     log(Gun);
//   }
// }
