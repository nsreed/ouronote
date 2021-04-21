import { NgModule } from '@angular/core';
import { NgGunComponent } from './ng-gun.component';
import { GunOptions } from './ng-gun.service';
import { SoulPipe } from './soul.pipe';
import { UpdatedPipe } from './updated.pipe';
import { ChainDirective } from './chain.directive';
import { AliasPipe } from './alias.pipe';
import { VerifyPipe } from './verify.pipe';
import { LogService } from '../../../log/src/lib/log.service';
import { LogModule } from '../../../log/src/lib/log.module';

@NgModule({
  declarations: [
    NgGunComponent,
    SoulPipe,
    UpdatedPipe,
    ChainDirective,
    AliasPipe,
    VerifyPipe,
  ],
  imports: [LogModule],
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
