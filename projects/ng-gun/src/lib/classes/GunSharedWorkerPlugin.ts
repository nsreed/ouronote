import * as Gun from 'gun';
import { over } from '../functions/gun-utils';
const randomString = (l: number, c?: string) => {
  let s = '';
  l = l || 24; // you are not going to make a 0 length random number, so no need to check type
  c = c || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz';
  while (l-- > 0) {
    s += c.charAt(Math.floor(Math.random() * c.length));
  }
  return s;
};
export class GunSharedWorkerPlugin {
  opt?: any;
  mesh?: any;
  worker!: SharedWorker;
  id = `gun-sharedworker-${Math.round(Math.random() * 1000000)}`;
  calls: any = {};
  constructor(private root: any, GunConst: any = Gun) {
    const that = this;
    const opt = root.opt;
    if (root.opt.sharedWorkerAdapter) {
      console.warn('tried duplicate sharedWorkerAdapter');
      return;
    }
    if (false === opt.SharedWorker) {
      return;
    } else {
      opt.SharedWorker = opt.SharedWorker || SharedWorker;
    }
    if ('function' !== typeof opt.SharedWorker) {
      return;
    }
    opt.sharedWorkerURL = opt.sharedWorkerURL || '/assets/gun-shared.worker.js';
    opt.mesh = opt.mesh || GunConst.Mesh(root);
    this.worker = new opt.SharedWorker(opt.sharedWorkerURL);
    this.root = root;
    this.opt = this.root.opt;
    this.mesh = this.opt.mesh;
    this.worker.port.start();
    this.worker.port.onmessageerror = (evt: any) => {
      console.error('Error on SharedWorker port: ', evt);
    };
    this.worker.port.onmessage = ({ data }: any) => {
      this.opt.mesh.hear(data, this);
    };
    root.on('bye', function (this: any, peer: { id: any }) {
      this.to.next(peer);
    });

    root.on('hi', function (this: any, peer: { id: any; pid: any }) {
      if (peer instanceof RTCPeerConnection) {
        console.log(
          `RTCPeerConnection: ${root.opt.pid} -> ${peer.id} ${peer.pid}`
        );
        that.say({
          dam: '???',
          '#': randomString(10),
          pid: peer.id,
        });
      }
      this.to.next(peer);
    });

    if (root.opt.sharedWorker?.disconnectRedundantWebRTC) {
      over(root.opt.mesh.hear)('???---')((msg, peer) => {
        const dup = root.opt.peers[msg.pid];
        if (dup && dup instanceof RTCPeerConnection) {
          root.opt.mesh.bye(dup);
        }
      });
    }

    this.mesh.hi(this);
    this.opt.sharedWorkerAdapter = this;
  }
  static onOpt(this: any, root: any) {
    console.log('setting up GunSharedWorker instance');
    (this as any).to.next(root);
    const ep = new GunSharedWorkerPlugin(root);
  }
  static register(this: any, GunConst: any) {
    console.log('registering plugin');
    const result = GunConst.on('opt', GunSharedWorkerPlugin.onOpt);
    console.log(result);
  }

  say(data: any) {
    // console.log('[%s] should say', this.opt.pid, this.id, data);
    this.worker.port.postMessage(data);
  }

  bye() {
    console.log('byeing');
    this.worker.port.close();
  }

  get wire() {
    return this.worker.port;
  }

  set wire(value: any) {
    console.log('ignoring request to set wire', value);
  }
}
