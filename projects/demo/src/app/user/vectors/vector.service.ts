import { Inject, Injectable, NgZone, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { NgGunService } from '../../../../../ng-gun/src/lib/ng-gun.service';
import { SEA } from 'gun';
import { NgSeaService } from '../../../../../ng-gun/src/lib/ng-sea.service';
import { VectorGraph } from '../VectorGraph';
import { from } from 'rxjs';
import {
  mergeAll,
  takeLast,
  map,
  concatMap,
  take,
  mapTo,
} from 'rxjs/operators';
import { LogService } from '../../../../../log/src/lib/log.service';
import { unpack, getDeep } from './functions/packaging';
import * as paper from 'paper';
import { PaperPair } from './classes/PaperPair';
import { ProjectPair } from './classes/ProjectPair';

@Injectable({
  providedIn: 'root',
})
export class VectorService {
  vectors = this.userService.user.get('vectors');

  constructor(
    private userService: UserService,
    private ngGun: NgGunService,
    @Inject('gun-options')
    private gunOpts: any,
    private ngZone: NgZone,
    private sea: NgSeaService,
    private logger: LogService
  ) {}

  async certify(certificant: any, paths: string[], auth: any) {
    // console.log('certifying', certificant);
    if (typeof certificant !== 'object') {
      throw new Error('cannot certify provided certificant');
    } else if (!certificant.pub) {
      throw new Error('cannot certify provided certificant');
    }
    const store = {} as any;
    const certPromises = paths.map(async (path: string) => {
      const policy = { '*': path };
      const cert = await this.sea
        .certify(certificant, policy, auth)
        .toPromise();
      store[path] = {} as any;
      store[path][certificant.pub] = cert;
    });
    await Promise.all(certPromises);
    // console.log('certified', store);
    return store;
  }

  async importFile(file: any) {
    this.logger.log('importing file "%s"', file.name);
    const fr: FileReader = new FileReader();
    fr.readAsText(file);
    fr.onload = () => {
      try {
        this.import({
          title: file.name,
          data: fr.result,
        });
      } catch (e: any) {
        this.logger.error('Error parsing JSON file');
      }
    };
    fr.onerror = () => {
      this.logger.error('Error while reading reading file');
    };
  }

  async import(vectorGraph: any) {
    // figure this out
    this.logger.log('Importing Vector', vectorGraph);
    // FIXME this await is broken, probably within the create() call
    const created = await this.create(vectorGraph);
    const vectorNode = this.vectors.get(created as any);

    vectorNode.once().subscribe((vectorRecord: any) => {
      this.logger.log('new vector loaded from list', vectorRecord);
      vectorNode.certificates$.subscribe(() => {
        this.logger.log('vector certs loaded');
        const p = new paper.Project(new paper.Size(100, 100));
        p.importJSON(vectorGraph.data);
        const g = new ProjectPair(
          vectorNode as any,
          p,
          new paper.PaperScope(),
          this.logger
        );
        const deep = getDeep(p);
        vectorNode.get('layers' as never).put(deep.layers as never);
      });
    });
  }

  /**
   * Creates certificates for a given vector graph
   * @param value the VectorGraph data to use
   * @param vectorPair the optional vector pair to use
   */
  async initializeCertificates(value: VectorGraph, vectorPair: any) {
    const userPair = this.ngGun.auth().is;
    const certs = await this.certify(userPair, ['layers', 'title'], vectorPair);
    const vector = {
      ...value,
      owner: {} as any,
      certs,
    } as any;
    const vectorPairEnc = await SEA.encrypt(vectorPair, userPair);
    vector.owner[userPair.pub] = vectorPairEnc;
    return vector;
  }

  async create(
    value: VectorGraph = {
      title: 'New Vector',
    }
  ) {
    const vectorPair: any = await this.sea.pair().toPromise();
    const vector = await this.initializeCertificates(value, vectorPair);

    const vectorAuthRoot = new NgGunService(this.gunOpts, this.ngZone);

    const otp = new EventEmitter();
    vectorAuthRoot.gun.user().auth(
      vectorPair as any,
      (async () => {
        this.logger.log('vector auth complete');
        const vectorAuth = vectorAuthRoot.gun.user();
        this.vectors.set(vectorAuth as never);
        vectorAuth.put(vector, (...args) => otp.emit(vectorAuth));
      }) as any
    );
    const ready = otp.pipe(take(1));
    return await ready.pipe(mapTo('~' + vectorPair.pub)).toPromise();
  }

  private isVector(value: any) {
    try {
      return !Array.isArray(value) && value.title;
    } catch (e: any) {
      return false;
    }
  }
}
