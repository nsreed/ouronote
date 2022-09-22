import { Injectable } from '@angular/core';
import { NgGunService } from './ng-gun.service';
import { IGunMesh } from './types/gun-mesh';
import { over } from './functions/gun-utils';

@Injectable({
  providedIn: 'root',
})
export class DamService {
  mesh: IGunMesh = this.ngGun.gun.back('opt.mesh' as any) as any;
  constructor(private ngGun: NgGunService) { }
  disconnect(peer: any) {
    peer.retries = 0;
    this.mesh.bye(peer);
  }
  connect(peer: any, tries = peer.tries || 5) {
    console.log('connecting', peer, tries);
    if ('object' === typeof peer) {
      if (peer.wire) {
        if (peer.wire.readyState === 1) {
          console.warn('trying to connect already connected peer', peer);
          return;
        }
        console.log('endpoint with unready wire... odd');
      }

      this.mesh.hi(peer);
      const ws = peer.wire as WebSocket;
      if (!peer.onOpen) {
        peer.onOpen = over(ws)('onopen')(function (this: any) {
          console.log(this, ws);
        });
      }
    } else if ('string' === typeof peer) {
      this.mesh.say({ dam: 'opt', opt: { peers: peer } });
    }
    // console.log('CONNECTING', endpoint);
    // // this.mesh.hi(endpoint);
    // console.log('after connect', endpoint);
    // if ('object' === typeof endpoint) {
    //   console.log(endpoint.url);
    //   this.mesh.say({ dam: 'opt', opt: { peers: endpoint } });
    //   console.log(this.ngGun.gun.back('opt.peers' as never));
    // } else {
    //   endpoint = 'object' === typeof endpoint ? [endpoint] : endpoint;
    //   this.mesh.say({ dam: 'opt', opt: { peers: endpoint } });
    //   // this.mesh.hi({ url: endpoint });
    // }
  }
}
