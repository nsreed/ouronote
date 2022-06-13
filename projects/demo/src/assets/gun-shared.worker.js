/// <reference lib="webworker" />
const KEEPALIVE_INTERVAL = 5 * 1000;
const CLIENT_TIMEOUT = 10 * 1000;
const CLIENT_DEAD = 20 * 1000;

function getPID() {
  return (Math.random() * 99999999).toFixed(0);
}
class ConnectionManager {
  pid = getPID();
  connections = new Set();

  constructor(workerGlobal = self) {
    workerGlobal.onconnect = (e) => this.onConnect(e);
  }

  getSessions() {
    const pairs = [...this.connections.values()]
      .filter((c) => c.sessionPair)
      .map((c) => c.sessionPair)
      .reduce((acc, p) => {
        if (!acc.find(a => a.priv === p.priv)) {
          acc.push(p);
        }
        return acc;
      }, []);
    return [...new Set(pairs).values()];
  }

  onConnect(connectEvent) {
    const port = connectEvent.ports[0];
    const connection = new Connection(port, this);
    this.addConnection(connection);
  }

  addConnection(connection) {
    this.connections.add(connection);
  }

  removeConnection(connection) {
    this.connections.delete(connection);
    this.onSession();
  }

  onSession(pair) {
    const pairs = this.getSessions();
    dispatch("sessions", { sessions: pairs });
    change('sessions', pairs);
  }
}

class Connection {
  pid = getPID();
  port;
  lastSeen = Date.now();
  keepaliveInterval;
  seq = 0;
  sessionPair = null;
  manager;

  calls = new Map();

  get sinceLastSeen() {
    return Date.now() - this.lastSeen;
  }

  constructor(port, manager) {
    this.port = port;
    this.manager = manager;
    port.start();

    port.onmessage = (message) => this.onMessage(message);
    port.onmessageerror = (err) => this.onMessageError(err);

    this.keepaliveInterval = setInterval(
      () => this.checkAlive(),
      KEEPALIVE_INTERVAL
    );

    this.log("welcome");
  }

  async checkAlive() {
    if (this.sinceLastSeen > CLIENT_DEAD) {
      log(
        `client [${this.pid}] quiet for ${this.sinceLastSeen}ms, disconnecting`
      );
      this.destroy();
      return;
    }
    if (this.sinceLastSeen > CLIENT_TIMEOUT) {
      this.keepalive();
    }
  }

  async keepalive() {
    const r = await this.command("keepalive");
    this.lastSeen = Date.now();
  }

  async command(name, ...args) {
    const p = new Promise((resolve, reject) => {
      const c = {
        seq: this.seq++,
        cmd: name,
        args,
      };
      this.port.postMessage(c);

      this.calls.set(c.seq, (result) => {
        if (result) {
          if (result.error) {
            reject(result);
          } else {
            resolve(result.result);
          }
        } else {
          resolve();
        }
        this.calls.delete(c.seq);
      });
    });
    return p;
  }

  log(msg, ...data) {
    msg = `${msg}`;
    const message = { msg, data };
    if (!data || data.length === 0) {
      delete message['data'];
    }
    this.port.postMessage(message);
  }

  onMessage({ data }) {
    this.lastSeen = Date.now();
    if (data.cmd) {
      this.onCommand(data);
    }
  }

  onCommand({ cmd, args, seq, rseq }) {
    if (seq === undefined && rseq === undefined) {
      this.log("not a command", data);
      return;
    }
    // This is a response
    if (rseq !== undefined && rseq !== null) {
      // TODO clean up unused calls
      const p = this.calls.get(rseq);
      if ("function" === typeof p) {
        this.calls.delete(rseq);
        p(...(args || []));
      }
      return;
    }

    const fn = this[cmd];

    // This is a command
    if ("function" !== typeof fn) {
      this.log(`cannot execute ${cmd}`);
      this.port.postMessage({
        ...data,
        rseq: seq,
        error: "no such command",
      });
      return;
    }

    try {
      const ret = this[cmd](...(args || []));
      this.port.postMessage({
        cmd,
        args,
        seq,
        rseq: seq,
        result: ret,
      });
    } catch (err) {
      this.log("error processing command", err);
      this.port.postMessage({
        cmd,
        args,
        seq,
        rseq: seq,
        error: err.message,
      })
    }
  }

  setSession(pair) {
    if (pair && !isPair(pair)) {
      throw new Error('Invalid session pair given');
    }
    this.sessionPair = pair;
    this.manager.onSession(pair);
  }

  getSessions() {
    return this.manager.getSessions();
  }

  onMessageError(err) { }

  destroy() {
    clearInterval(this.keepaliveInterval);
    this.manager.removeConnection(this);
  }
}

function isPair(pair) {
  return ['priv', 'pub'].every(k => Object.keys(pair).includes(k) && pair[k] !== null)
}

function announce(msg) {
  manager.connections.forEach((c) => c.port.postMessage(msg));
}

function dispatch(name, data = {}, ...args) {
  const e = {
    type: "event",
    name,
    ...data,
    args,
  };
  if (args.length === 0) {
    delete e['args'];
  }
  announce(e);
}

function change(name, value) {
  announce({
    change: name,
    value,
  });
}

function log(msg, ...data) {
  const m = {
    msg,
    data
  };
  if (data.length === 0) {
    delete m['data'];
  }
  announce(m);
}

const manager = new ConnectionManager(self);

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
