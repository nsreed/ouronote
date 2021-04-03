import { NgModule } from '@angular/core';
import { NgGunComponent } from './ng-gun.component';
import { GunOptions } from './ng-gun.service';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
import { ChainDirective } from './chain.directive';
import { AliasPipe } from './alias.pipe';
import { VerifyPipe } from './verify.pipe';

@NgModule({
  declarations: [
    NgGunComponent,
    SoulPipe,
    UpdatedPipe,
    ChainDirective,
    AliasPipe,
    VerifyPipe,
  ],
  imports: [],
  exports: [
    NgGunComponent,
    SoulPipe,
    UpdatedPipe,
    ChainDirective,
    AliasPipe,
    VerifyPipe,
  ],
})
export class NgGunModule {}
