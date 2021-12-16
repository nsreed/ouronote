import { NgModule } from '@angular/core';
import { AliasPipe } from './alias.pipe';
import { ChainDirective } from './chain.directive';
import { NgGunComponent } from './ng-gun.component';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
import { VerifyPipe } from './verify.pipe';
import { RouteChainDirective } from './route-chain.directive';
import { GunMapDirective } from './gun-map.directive';
import { LogModule } from '../../../log/src/lib/log.module';
import { OwnerPipe } from './owner.pipe';

@NgModule({
  imports: [LogModule],
  declarations: [
    NgGunComponent,
    SoulPipe,
    UpdatedPipe,
    ChainDirective,
    AliasPipe,
    VerifyPipe,
    RouteChainDirective,
    GunMapDirective,
    OwnerPipe,
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
    OwnerPipe,
  ],
  providers: [{ provide: 'gun-route-data-key', useValue: 'chain' }],
})
export class NgGunModule {}
