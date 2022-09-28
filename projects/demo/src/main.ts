import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// TODO this is part 2
// window.dispatchEvent(new MessageEvent('message', {
//   data: 'bootstrapping'
// }));
const loader = (window as any)['loader'];
loader.addTask('bootstrap');
if (environment.production) {
  enableProdMode();
}
// setTimeout(() => {

// try {
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((reason) => {
    loader.handleError(reason);
    console.error(reason);
  });
// AppModule.status.hideOverlay();
// } catch (err: any) {
//   console.error(err);
//   loader.handleError(err);
// }
// }, 4000);
