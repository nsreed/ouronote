import { enableProdMode, NgModule, platformCore } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


// TODO this is part 2
// window.dispatchEvent(new MessageEvent('message', {
//   data: 'bootstrapping'
// }));

if (environment.production) {
  enableProdMode();
}
// setTimeout(() => {
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
// }, 4000);
