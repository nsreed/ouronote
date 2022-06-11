import { Injectable, EventEmitter } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { LogService } from '../../../log/src/lib/log.service';
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

  session$ = new EventEmitter();

  private _session: any;
  public get session(): any {
    return this._session;
  }
  private set session(value: any) {
    this._session = value;
    this.session$.emit(value);
  }

  message$ = fromEvent(this.worker.port, 'message').pipe(
    shareReplay(1)
  ) as Observable<any>;

  response$ = this.message$.pipe(
    filter(({ data }) => Object.keys(data).includes('seq'))
  );
  announce$ = this.message$.pipe(
    filter(({ data }) => !Object.keys(data).includes('seq'))
  );
  change$ = this.announce$.pipe(
    filter(({ data }) => data.change),
    pluck('data')
  );

  error$ = fromEvent(this.worker, 'error').pipe(
    shareReplay(1)
  ) as Observable<any>;

  constructor(private worker: SharedWorker, private logger: LogService) {
    worker.port.start();
    this.loadSession();
  }

  async loadSession() {
    const pair = await this.getSession();
    this.session = pair;
    this.change$.subscribe((data: any) => {
      this[data.change as keyof NgGunSessionService] = data.value;
    });
  }

  async getSession() {
    return await this.postMessage('getSession');
  }

  async setSession(pair: any) {
    this.logger.log('setSession', pair);
    return await this.postMessage('setSession', pair);
  }

  async postMessage(cmd: string, ...args: any[]) {
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
