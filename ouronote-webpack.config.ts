/**
 * Custom webpack configuration using @angular-builders/custom-webpack
 * see (https://github.com/just-jeb/angular-builders/tree/master/packages/custom-webpack#Custom-webpack-browser)
 * see (https://github.com/just-jeb/angular-builders/tree/master/examples/custom-webpack/full-cycle-app)
 *
 * May want to extend with
 * see (https://webpack.js.org/plugins/define-plugin/#runtime-values-via-runtimevalue)
 * or make our own plugin that can listen for output like webpack-ext-reloader
 *
 * of misc note, if build or serve fails, it's because we haven't built our libraries yet
 * see (https://angular.io/guide/creating-libraries#using-your-own-library-in-applications)
 */
import { Configuration, DefinePlugin, NormalModule, webpack } from 'webpack';
import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';

const { version } = require("./package.json");
const { resolve, relative } = require("path");
const { writeFileSync } = require("fs-extra");
const { hashElement } = require('folder-hash');

const hashOpts = {
  encoding: 'hex',
  folders: { exclude: ['.*', 'node_modules', 'test_coverage', 'coverage', 'typings', 'radata'] },
  files: { include: ['**/*.js', '**/*.ts', '**/*.json'] }
};



export default (function (packageVersion) {
  return (
    cfg: Configuration,
    opts: CustomWebpackBrowserSchema,
    targetOptions: TargetOptions
  ) => {
    // console.log({ cfg, opts, targetOptions });

    const appHashFn = DefinePlugin.runtimeValue(({ module, key }) => {
      // console.log({ module, key, version });
      // console.log({ packageVersion })
      return JSON.stringify({
        hash: '', // FIXME we can't get the hash asynchronously
        timestamp: Date.now(),
        version: packageVersion
      }) as any;
    }, true);

    // hashElement('./projects', hashOpts).then(({ hash }: any) => {
    //   // console.log('source hash', hash);
    // });

    cfg = cfg || {};
    cfg.plugins = cfg.plugins || [];
    cfg.plugins?.push(
      new DefinePlugin({
        APP_HASH: appHashFn
      })
    );
    return cfg;
  }
})(version)
