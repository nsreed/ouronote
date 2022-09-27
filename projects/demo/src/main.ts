import { enableProdMode, NgModule, platformCore } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


// TODO this is part 2
// window.dispatchEvent(new MessageEvent('message', {
//   data: 'bootstrapping'
// }));

AppModule.status.addTask('bootstrap');
if (environment.production) {
  enableProdMode();
}
// setTimeout(() => {


async function main() {
  try {
    await platformBrowserDynamic()
      .bootstrapModule(AppModule);
    // AppModule.status.hideOverlay();
  } catch (err: any) {
    console.error(err);
    AppModule.status.handleError(err);
  }
}
// }, 4000);
main();
