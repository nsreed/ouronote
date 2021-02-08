import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GunPeersComponent } from './gun-peers/gun-peers.component';
import { Message } from './model';
@NgModule({
  declarations: [GunPeersComponent, AppComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    {
      provide: 'gun-options',
      useValue: {
        localStorage: true,
        peers: ['http://localhost:8765/gun'],
      },
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
