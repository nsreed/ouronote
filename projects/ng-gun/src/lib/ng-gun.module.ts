import { NgModule } from '@angular/core';
import { NgGunComponent } from './ng-gun.component';
import { GunOptions } from './ng-gun.service';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
import { ChainDirective } from './chain.directive';

@NgModule({
  declarations: [NgGunComponent, SoulPipe, UpdatedPipe, ChainDirective],
  imports: [],
  providers: [{ provide: GunOptions, useValue: { localStorage: true } }],
  exports: [NgGunComponent, SoulPipe, UpdatedPipe, ChainDirective],
})
export class NgGunModule {}
