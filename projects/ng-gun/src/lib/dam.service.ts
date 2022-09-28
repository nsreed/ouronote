import { Inject, Injectable, Optional } from '@angular/core';
import { NgGunService } from './ng-gun.service';
import { IGunMesh } from './types/gun-mesh';
import { over } from './functions/gun-utils';
import { LogService } from 'log';
import { timer } from 'rxjs';
import { GunPeer } from './GunPeer';

@Injectable({
  providedIn: 'root',
})
export class DamService {
  mesh: IGunMesh = this.ngGun.gun.back('opt.mesh' as any) as any;

  get peerMap() {
    return this.ngGun.peers;
  }
  get peers(): GunPeer[] {
    const peers = Object.keys(this.ngGun.peers).map((k) => {
      const rawPeer = this.ngGun.peers[k] as GunPeer;
      return rawPeer;
    });
    return peers;
  }
  constructor(
    private ngGun: NgGunService,
    private logger: LogService,
    @Optional() @Inject('gun-peers') public readonly gunPeers: string[]
  ) {
    this.gunPeers = this.gunPeers || [];
    logger.name = 'dam.service';
    this.logger.log(
      `DAM service started with peers: ${JSON.stringify(gunPeers)}`
    );
    // this.connectAll();
    timer(1000, 20000).subscribe(() => {
      this.connectAll();
    });
  }

  async connectAll() {
    const notConnected = this.gunPeers.filter(
      (peer) => !Object.keys(this.peerMap).includes(peer)
    );
    if (notConnected.length > 0) {
      const allResults = await Promise.all(
        notConnected.map(async (peer) => {
          try {
            const goodURL = await this.checkConnectivity(peer);
            return goodURL;
          } catch (err: any) {
            console.error(err.message);
          }
        })
      );
      const all = allResults.filter((r) => r !== undefined);
      this.logger.verbose(
        `connecting all that aren't in ${JSON.stringify(
          Object.keys(this.peerMap)
        )}`
      );
      this.logger.verbose('results:', all);
      all.forEach((peer) => this.connect(peer));
    }
  }

  async checkConnectivity(peer: string) {
    // Try to make a websocket to the peer
    this.logger.verbose(`checkConnectivity(${peer})`);
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(peer.replace(/^http/, 'ws'));
      ws.onerror = (ev: Event) => {
        this.logger.error(`onerror for ${peer}!`);
        reject('websocket error');
      };
      ws.onopen = (ev: Event) => {
        this.logger.verbose(`onopen for ${peer}!`);
        resolve({
          url: peer,
          id: peer,
          wire: ws,
        });
      };
      timer(10000).subscribe(() => reject(new Error(`${peer} timed out`)));
    });
  }

  disconnect(peer: any) {
    this.mesh.bye(peer);
    if ('string' === typeof peer) {
      delete this.peerMap[peer];
    } else if ('object' === typeof peer) {
      peer.retries = 0;
      delete this.peerMap[peer.id || peer.url];
    }
    this.ngGun.gun
      .get('time')
      .put({ now: Date.now() } as never, ({ err, ok }) => {
        if (err) {
          this.logger.error('refresh put() err', err);
        } else {
          this.logger.log('refresh ack ok', ok);
        }
      });
    this.logger.log('peer disconnected.');
  }

  connect(peer: any) {
    // console.log('connecting', peer, tries);
    if ('object' === typeof peer) {
      // if (peer.wire) {
      //   if (peer.wire.readyState === 1) {
      //     // console.warn('trying to connect already connected peer', peer);
      //     return;
      //   }
      //   // console.log('endpoint with unready wire... odd');
      // }

      this.mesh.hi(peer);
      // const ws = peer.wire as WebSocket;
      // if (!peer.onOpen) {
      //   peer.onOpen = over(ws)('onopen')(function (this: any) {
      //     this.logger.log('onopen event', this, ws);
      //   });
      // }
    } else if ('string' === typeof peer) {
      this.logger.log(`connect(${peer})`);
      this.mesh.say({ dam: 'opt', opt: { peers: [peer] } });
      // this.ngGun.gun.opt({ peers: peer as any });
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
