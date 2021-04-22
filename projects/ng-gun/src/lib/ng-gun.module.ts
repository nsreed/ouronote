import { NgModule } from '@angular/core';
import { AliasPipe } from './alias.pipe';
import { ChainDirective } from './chain.directive';
import { NgGunComponent } from './ng-gun.component';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
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
