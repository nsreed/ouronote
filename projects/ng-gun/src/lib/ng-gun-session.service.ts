import { Injectable, EventEmitter } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { LogService } from '../../../log/src/lib/log.service';
import { NgGunService } from './ng-gun.service';
import {
  filter,
  take,
  pluck,
  map,
  switchMap,
  shareReplay,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NgGunSessionService {
  private _seq = 0;

  message$ = fromEvent(this.worker.port, 'message').pipe(
    shareReplay(1)
  ) as Observable<any>;
  response$ = this.message$.pipe(
    filter(({ data }) => Object.keys(data).includes('rseq'))
  );
  announce$ = this.message$.pipe(
    filter(({ data }) => !Object.keys(data).includes('rseq'))
  );
  command$ = this.announce$.pipe(
    filter(
      ({ data }) =>
        Object.keys(data).includes('cmd') &&
        (data.seq !== undefined || data.rseq !== undefined)
    ),
    pluck('data')
  );
  change$ = this.announce$.pipe(
    filter(({ data }) => data.change),
    pluck('data')
  );
  event$ = this.announce$.pipe(
    filter(({ data }) => data.type === 'event'),
    pluck('data')
  );
  log$ = this.announce$.pipe(
    filter(({ data }) => data.msg),
    pluck('data')
  );

  error$ = fromEvent(this.worker, 'error').pipe(
    shareReplay(1)
  ) as Observable<any>;

  constructor(
    private worker: SharedWorker,
    private logger: LogService,
    private gunService: NgGunService
  ) {
    worker.port.start();
    this.log$.subscribe((data) => {
      this.logger.log('WORKER: %s %o', data.msg, data.data);
    });
    this.command$.subscribe((command: any) => this.onCommand(command));
    this.event$.subscribe((e: any) => {
      this.logger.log('got event', e);
    });
    this.gunService.auth(true).auth$.subscribe((a) => {
      this.logger.log('got auth event', a);
    });
    this.init();
  }

  async init() {
    const is = this.gunService.auth().is;
    const pair = is?.priv ? is : is?.alias;
    const response = await this.setSession(pair);
    this.logger.log('session response', response);
  }

  async onCommand(command: any) {
    switch (command.cmd) {
      case 'keepalive':
        this.result(command, true);
        break;
      case 'getSession':
        this.result(command, this.gunService.auth().is);
        break;
    }
  }

  async result(command: any, result: any) {
    const res = {
      ...command,
      rseq: command.seq,
      result,
    };
    // this.logger.log('sending result', res);
    this.worker.port.postMessage(res);
  }

  async getSession() {
    this.logger.log('getting session');
    return await this.command('getSession');
  }

  async setSession(pair: any) {
    this.logger.log('setSession', pair);
    return await this.command('setSession', pair);
  }

  async command(cmd: string, ...args: any[]) {
    const seq = this.getSeq();
    this.worker.port.postMessage({
      cmd,
      seq,
      args,
    });
    return await this.response$
      .pipe(
        filter(({ data }) => data.seq === seq),
        take(1),
        pluck('data'),
        map((v) => {
          if (v.error) {
            throw new Error(v.error);
          } else {
            return v.result;
          }
        })
      )
      .toPromise();
  }

  private getSeq() {
    return this._seq++;
  }
}
