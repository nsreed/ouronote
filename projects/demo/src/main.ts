import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// TODO this is part 2
// window.dispatchEvent(new MessageEvent('message', {
//   data: 'bootstrapping'
// }));
const loader = (window as any)['loader'];
if (environment.production) {
  enableProdMode();
}
// setTimeout(() => {
async function main() {
  loader.log('attempting bootstrap of AppModule');
  try {
    const ref = await platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((reason) => {
        console.error(reason);
        loader.handleError(reason);
      });

    if (ref) {

      loader.finishTask('bootstrap');
    }
    // AppModule.status.hideOverlay();
  } catch (err: any) {
    console.error(err);
    //   loader.handleError(err);
  }
  // }, 4000);
}
main();
