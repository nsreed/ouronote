const { version } = require("./package.json");
const { resolve, relative } = require("path");
const { writeFileSync } = require("fs-extra");
const { hashElement } = require('folder-hash');
// const crypto = require('crypto');
// const sha1 = crypto.createHash('sha1');

const opt = {
  encoding: 'hex',
  folders: { exclude: ['.*', 'node_modules', 'test_coverage', 'coverage', 'typings', 'radata'] },
  files: { include: ['**/*.js', '**/*.ts', '**/*.json'] }
};

hashElement('./dist', opt).then(dirHash => {
  // sha1.update(dirHash);
  // const hash = sha1.digest('hex');
  // console.log(hash);
  const hash = dirHash.hash;

  const file = resolve(
    __dirname,
    "projects",
    "demo",
    "src",
    "environments",
    "version.ts"
  );
  writeFileSync(
    file,
    `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
  /* tslint:disable */
  export const VERSION = ${JSON.stringify({ version, hash }, null, 4)};
  /* tslint:enable */
  `,
    { encoding: "utf-8" }
  );
  //tslint:disable-next-line:no-console
  console.log(
    `Wrote version info ${JSON.stringify({ version, hash })} to ${relative(
      resolve(__dirname, ".."),
      file
    )}`
  );
}).catch(error => console.error('hash failed', error));
