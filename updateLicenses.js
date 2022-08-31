const { resolve, relative } = require("path");
const { writeFileSync } = require("fs-extra");

console.log('updating licenses...');
const licenseJSONFile = resolve(
  __dirname, 'projects', 'demo', 'src', 'assets', 'licenses.json');
const licenses = require(licenseJSONFile);

for (const k in licenses) {
  if (k.startsWith('ouronote')) {
    delete licenses[k];
    continue;
  }
  const license = licenses[k];
  delete license['path'];
}

writeFileSync(
  licenseJSONFile,
  JSON.stringify(licenses),
  { encoding: 'utf-8' }
);
