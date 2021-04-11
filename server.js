const path = require("path");
const express = require("express");
const Gun = require("gun");
const app = express();
app.use(express.static(__dirname + "/dist/demo"));
app.use(Gun.serve);
app.get("/app/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/demo", "index.html"));
});
app.listen(process.env.PORT || 80);
