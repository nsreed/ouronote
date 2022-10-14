import { NgModule } from '@angular/core';
import { AliasPipe } from './alias.pipe';
import { ChainDirective } from './chain.directive';
import { GetDirective } from './directives/get.directive';
import { GunMapDirective } from './gun-map.directive';
import { NgGunComponent } from './ng-gun.component';
import { OwnerPipe } from './owner.pipe';
import { OnPipe } from './pipes/on.pipe';
import { OpenPipe } from './pipes/open.pipe';
import { RouteChainDirective } from './route-chain.directive';
import { SchemaModule } from './schema/schema.module';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
import { VerifyPipe } from './verify.pipe';
import { LogModule } from 'log';
import { FormsModule } from './forms/forms.module';

@NgModule({
  imports: [SchemaModule, LogModule, FormsModule],
  declarations: [
    AliasPipe,
    ChainDirective,
    GetDirective,
    GunMapDirective,
    NgGunComponent,
    OnPipe,
    OpenPipe,
    OwnerPipe,
    RouteChainDirective,
    SoulPipe,
    UpdatedPipe,
    VerifyPipe,
  ],
  exports: [
    AliasPipe,
    ChainDirective,
    GetDirective,
    GunMapDirective,
    NgGunComponent,
    OnPipe,
    OpenPipe,
    OwnerPipe,
    RouteChainDirective,
    SoulPipe,
    UpdatedPipe,
    VerifyPipe,
  ],
  providers: [{ provide: 'gun-route-data-key', useValue: 'chain' }],
})
export class NgGunModule {}
