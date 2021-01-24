import { NgModule } from '@angular/core';
import { NgGunComponent } from './ng-gun.component';
import { GunOptions } from './ng-gun.service';

@NgModule({
  declarations: [NgGunComponent],
  imports: [],
  providers: [{ provide: GunOptions, useValue: { localStorage: true } }],
  exports: [NgGunComponent],
})
export class NgGunModule {}
