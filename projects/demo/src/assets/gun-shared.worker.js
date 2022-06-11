/// <reference lib="webworker" />
connections = [];

function announce(msg) {
  connections.forEach(c => c.postMessage(msg));
}

function change(name, value) {
  announce({
    change: name,
    value
  })
}

function log(msg, ...data) {
  announce({
    msg,
    data: data || []
  })
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
    // const idx = indexedDB.open('ouronote-shared');

    // log(`type of ${typeof self.indexedDB}`)
  }
}

function loadGun() {
  if ('function' === typeof self.importScripts) {
    announce('importing...');
    try {
      self.importScripts('/assets/gun/gun.js');
    } catch (err) {
      announce(`Error: ${err.message}`);
    }
    log(Gun);
  }
}

self.onconnect = connectEvent => {
  const port = connectEvent.ports[0];

  port.start();
  connections.push(port);

  const shared = new SharedState();

  const commands = {
    getSession: () => shared.session,
    setSession: (pair) => {
      if (JSON.stringify(pair) === JSON.stringify(shared.session)) {
        log('same session');
        return shared.session;
      }
      shared.session = pair;
      change('session', shared.session);
      return shared.session;
    }
  };
  port.onmessage = ({ data }) => {
    cmd = data.cmd;
    args = data.args || [];
    if (Object.keys(commands).includes(cmd)) {
      const result = commands[cmd](...args); // TODO handle errors
      port.postMessage({ ...data, result });
    } else {
      port.postMessage({ ...data, error: 'unrecognized command' });
    }
  }
};
