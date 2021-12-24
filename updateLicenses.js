const { resolve, relative } = require("path");
const { writeFileSync } = require("fs-extra");

const licenses = require('./licenses.json');
for(const k in licenses) {
  const license = licenses[k];
  delete license['path'];
}

writeFileSync(
  resolve(
    __dirname, 'projects', 'demo', 'src', 'assets', 'licenses.json'),
    JSON.stringify(licenses),
    {encoding: 'utf-8'}
  );
