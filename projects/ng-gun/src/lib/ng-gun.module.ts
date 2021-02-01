import { NgModule } from '@angular/core';
import { NgGunComponent } from './ng-gun.component';
import { GunOptions } from './ng-gun.service';
import { SoulPipe } from './soul.pipe';

@NgModule({
  declarations: [NgGunComponent, SoulPipe],
  imports: [],
  providers: [{ provide: GunOptions, useValue: { localStorage: true } }],
  exports: [NgGunComponent, SoulPipe],
})
export class NgGunModule {}
