const { ArgumentError } = require("argparse");
const { ArgumentParser, SUPPRESS, FileType } = require('argparse');
const { ArgumentTypeError } = require("argparse");
const { resolve, relative } = require("path");
const { version } = require('./package.json');
const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const process = require("process");
const sub = require('argparse/lib/sub');

const lowerKeys = obj => Object.entries(obj).reduce((p, c) => {
  p[c[0].toLowerCase()] = c[1];
  return p;
}, {});

function _callable(cls) {
  let result = { // object is needed for inferred class name
    [cls.name]: function (...args) {
      let this_class = new.target === result || !new.target
      return Reflect.construct(cls, args, this_class ? cls : new.target)
    }
  }
  result[cls.name].prototype = cls.prototype
  // fix default tag for toString, e.g. [object Action] instead of [object Object]
  cls.prototype[Symbol.toStringTag] = cls.name
  return result[cls.name]
}

const ExistingFileType = _callable(class EFT extends Function {
  constructor() {
    let [flags] = arguments;
    super('return arguments.callee.call.apply(arguments.callee, arguments)');
    Object.defineProperty(this, 'name', {
      get() {
        return sub('ExistingFileType(%r)', flags)
      }
    })
  }

  call(str) {
    if (!fs.existsSync(str)) {
      throw new ArgumentTypeError('File must exist!');
    }
    return path.resolve(str);
  }
});
const PathType = _callable(class PT extends Function {
  constructor() {
    let [flags] = arguments;
    super('return arguments.callee.call.apply(arguments.callee, arguments)');
    Object.defineProperty(this, 'name', {
      get() {
        return sub('PathType(%r)', flags)
      }
    })
  }

  call(str) {
    return path.resolve(str);
  }
});

const commonParser = new ArgumentParser({ add_help: false });
commonParser.add_argument('-d', '--dry', { help: 'Skips launching the server, instead shows config.', action: 'store_const', dest: 'next', const: showArgs });

const serverParser = new ArgumentParser({ add_help: false });
const serverGroup = serverParser.add_argument_group({ title: 'Web Server' });
serverGroup.add_argument('--web-root', { default: path.resolve('./dist/demo') });
// serverGroup.add_argument('--app-index', { default: path.resolve(path.resolve('./dist/demo'), 'index.html') });
serverGroup.add_argument('--data-dir', { type: PathType(), help: 'Path to store data', default: './radata' });

const httpParser = new ArgumentParser({ add_help: false, description: 'HTTP Options' });
const httpGroup = httpParser.add_argument_group({ title: 'HTTP Options' });
httpGroup.add_argument('-p', '--port', { type: Number, default: 8765, dest: 'http_port', help: 'HTTP Port' });

const httpsParser = new ArgumentParser({ add_help: false });
const httpsGroup = httpsParser.add_argument_group({ title: 'HTTPS Options' });
httpsGroup.add_argument('--https', { action: 'store_true', help: 'Enable HTTPS Server', default: false });
httpsGroup.add_argument('--https-port', { type: Number, default: 443, help: 'HTTPS Port' });
httpsGroup.add_argument('--https-crt', { type: ExistingFileType('r'), default: './ouronote-dev.crt' });
httpsGroup.add_argument('--https-key', { type: ExistingFileType('r'), default: './ouronote-dev.key' });

const logParser = new ArgumentParser({ add_help: false });
const logGroup = logParser.add_argument_group({ title: 'Logging Options' });
logGroup.add_argument('--log-level', { choices: ['verbose', 'info', 'warn', 'error', 'none'], default: 'info' });

const parser = new ArgumentParser({
  description: 'starts the ouronote webserver',
  argument_default: SUPPRESS,
  parents: [serverParser, httpParser, logParser, commonParser],
});
parser.set_defaults({ next: startHerokuServer });

const commands = parser.add_subparsers({ description: 'Select a server configuration to run', required: false, dest: 'subparser_name', title: 'Configurations', metavar: 'COMMAND' });

const localServerParser = commands.add_parser('local', { help: 'Launches the local server configuration', description: 'Local Server', parents: [serverParser, httpParser, httpsParser, logParser, commonParser] });
localServerParser.set_defaults({
  https: true,
  ...envToNamespace(localServerParser, process.env)
});
localServerParser.set_defaults({ next: startLocalServer });

// const herokuServerParser = commands.add_parser('heroku', { help: 'Launches the heroku server configuration', description: 'Heroku Server', parents: [serverParser, httpParser, logParser, commonParser] });
// herokuServerParser.set_defaults({
//   ...envToNamespace(herokuServerParser, process.env)
// });
// herokuServerParser.set_defaults({ next: startHerokuServer });

parser.add_argument('-v', '--version', { action: 'version', version });


function envToNamespace(parsersOrParser, env) {
  const lowEnv = lowerKeys(env);
  parsers = Array.isArray(parsersOrParser) ? parsersOrParser : [parsersOrParser];
  return parsers.reduce((allParsers, currentParser) => {
    const parserEnv = Object.entries(lowEnv).reduce((recognized, envEntry) => {
      const [envKey, envValue] = envEntry;
      const parserDefault = currentParser.get_default(envKey);
      if (parserDefault === undefined) {
        return recognized;
      }
      const parserKeys = [envKey.replace(/_/g, '-'), envKey];
      const keyMatches = parserKeys.reduce((envObj, parserKey) => {
        const optionString = `--${parserKey}`;
        const action = currentParser._option_string_actions[optionString];
        if (!action) {
          return envObj;
        }
        const actionName = Object.getPrototypeOf(action)[Symbol.toStringTag];
        if (['_HelpAction', '_VersionAction'].includes(actionName)) {
          return envObj;
        }
        const [ns, unrecognized] = currentParser.parse_known_args([optionString, `${envValue}`]);
        envObj[envKey] = ns[envKey];
        return envObj;
      }, {});
      return {
        ...recognized,
        ...keyMatches
      }
    }, {});
    return {
      ...allParsers,
      ...parserEnv
    }
  }, {});
}

function showArgs(args) {
  console.log('would run with config:');
  console.dir(args);
}

function importGun() {
  const Gun = require("gun");
  require("gun/lib/radix");
  require("gun/lib/radisk");
  require("gun/lib/store");
  require("gun/lib/rindexed");
  require("gun/lib/webrtc");
  return Gun;
}

function getHttps(app, args) {
  let httpsServer;
  try {
    const EXPRESS_OPTS = {
      key: fs.readFileSync(args.https_key),
      cert: fs.readFileSync(args.https_crt),
    };
    // TODO un-comment this for local deploys?
    httpsServer = https.createServer(EXPRESS_OPTS, app).listen(args.https_port, '0.0.0.0');
    return httpsServer;
  } catch (e) {
    console.error("Error starting HTTPS server: ", e);
    console.log("will default to HTTP");
    return null;
  }
}

function getHttp(app, args) {
  return app.listen(args.http_port);
}

function getExpress(args) {
  const Gun = importGun();
  const app = express();
  app.use(express.static(args.web_root));
  app.get("/*", function (req, res) {
    res.sendFile(path.resolve(args.web_root, "index.html"));
  });
  return {
    Gun,
    app
  };
}

function startLocalServer(args) {
  console.log('starting local server configuration');
  console.dir({ args });
  const { Gun, app } = getExpress(args);
  const httpServer = getHttp(app, args);
  const httpsServer = getHttps(app, args);
  if (!httpsServer) {
    console.error('https not started!');
  }
  const gun = new Gun({
    web: httpsServer,
    file: args.data_dir,
    axe: false,
    port: args.http_port,
    multicast: false
  });
  app.use(Gun.serve);
  return gun;
}

function startHerokuServer(args) {
  console.log('starting heroku server configuration');
  // console.dir({ args });
  const { Gun, app } = getExpress(args);
  const httpServer = getHttp(app, args);
  const gun = Gun({
    web: httpServer,
    file: args.data_dir
  });
}

function main(...args) {
  const Gun = importGun();
  console.log("starting ouronote server");

  const PORT = process.env.PORT || 80;
  const HTTPS_PORT = process.env.HTTPS_PORT || 443;
  const RADATA = process.env.RADATA || path.join(__dirname, "radata");

  console.log({ PORT, HTTPS_PORT });

  let httpsServer;
  const app = express();
  app.use(Gun.serve);
  const appRoot = path.resolve(__dirname, "dist/demo");
  app.use(express.static(appRoot));
  app.get("/*", function (req, res) {
    res.sendFile(path.resolve(appRoot, "index.html"));
  });

  try {
    const pkf = resolve(__dirname, "ouronote-dev.key");
    const privateKey = fs.readFileSync(pkf);
    const cf = resolve(__dirname, "ouronote-dev.crt");
    const certificate = fs.readFileSync(cf);
    const EXPRESS_OPTS = {
      key: privateKey,
      cert: certificate,
    };
    // TODO un-comment this for local deploys?
    httpsServer = https.createServer(EXPRESS_OPTS, app).listen(HTTPS_PORT);
  } catch (e) {
    console.error("Error starting HTTPS server: ", e);
    console.log("will default to HTTP");
  }

  const server = app.listen(PORT);
  const gun = Gun({ web: httpsServer || server, file: RADATA });
}

// main();

const [current, remaining] = parser.parse_known_args(process.argv.slice(2), envToNamespace(parser, process.env));
const next = current.next;
if ('function' === typeof next) {
  next(current);
}
