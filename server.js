const path = require("path");
const express = require("express");
const Gun = require("gun");
const app = express();
app.use(Gun.serve);
app.use(express.static(__dirname + "/dist/demo"));

app.get("/*", function (req, res) {
  // console.log({ req, res });
  res.sendFile(path.join(__dirname, "dist/demo", "index.html"));
});
// Start the app by listening on the default Heroku port
const server = app.listen(process.env.PORT || 80);
// const gun = Gun({ web: server });
