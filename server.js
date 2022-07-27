const fs = require("fs");
const path = require("path");
const { resolve, relative } = require("path");
const express = require("express");
const Gun = require("gun");
require("gun/lib/radix");
require("gun/lib/radisk");
require("gun/lib/store");
require("gun/lib/rindexed");
require("gun/nts");
require("gun/lib/webrtc");
var https = require("https");
var http = require("http");

console.log("starting ouronote server");

const PORT = process.env.PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const RADATA = process.env.RADATA || path.join(__dirname, 'radata');

console.log({ PORT, HTTPS_PORT });

let httpsServer;
const app = express();
app.use(Gun.serve);
app.use(express.static(__dirname + "/dist/demo"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/demo", "index.html"));
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
  httpsServer = https.createServer(EXPRESS_OPTS, app).listen(HTTPS_PORT);
} catch (e) {
  console.error("Error starting HTTPS server: ", e);
  console.log("will default to HTTP");
}

const server = app.listen(PORT);
const gun = Gun({ web: httpsServer || server, file: RADATA });
