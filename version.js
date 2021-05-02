const { version } = require("./package.json");
const { resolve, relative } = require("path");
const { writeFileSync } = require("fs-extra");

const gitInfo = {};

gitInfo.version = version;

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
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`,
  { encoding: "utf-8" }
);

// tslint:disable-next-line: no-console
console.log(
  `Wrote version info ${JSON.stringify(gitInfo)} to ${relative(
    resolve(__dirname, ".."),
    file
  )}`
);
