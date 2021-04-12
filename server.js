const path = require("path");
const express = require("express");
const Gun = require("gun");
require("gun/nts");
require("gun/lib/webrtc");

const app = express();
app.use(Gun.serve);

app.use(express.static(__dirname + "/dist/demo"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/demo", "index.html"));
});
const server = app.listen(process.env.PORT || 80);
const gun = Gun({ web: server });
