import { NgModule } from '@angular/core';
import { AliasPipe } from './alias.pipe';
import { ChainDirective } from './chain.directive';
import { NgGunComponent } from './ng-gun.component';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
import { VerifyPipe } from './verify.pipe';
import { RouteChainDirective } from './route-chain.directive';
import { GunMapDirective } from './gun-map.directive';

@NgModule({
  declarations: [
    NgGunComponent,
    SoulPipe,
    UpdatedPipe,
    ChainDirective,
    AliasPipe,
    VerifyPipe,
    RouteChainDirective,
    GunMapDirective,
  ],
  exports: [
    NgGunComponent,
    SoulPipe,
    UpdatedPipe,
    ChainDirective,
    AliasPipe,
    VerifyPipe,
    RouteChainDirective,
    GunMapDirective,
  ],
  providers: [{ provide: 'gun-route-data-key', useValue: 'chain' }],
})
export class NgGunModule {}
