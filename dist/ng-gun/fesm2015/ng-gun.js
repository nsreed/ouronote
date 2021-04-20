import * as i0 from '@angular/core';
import { Injectable, Optional, Inject, SkipSelf, Component, Pipe, EventEmitter, Directive, Input, NgModule } from '@angular/core';
import * as Gun from 'gun';
import { SEA } from 'gun';
import { __awaiter, __decorate, __param } from 'tslib';
import { Subject, fromEventPattern, throwError, of, from } from 'rxjs';
import { take, debounceTime, scan, map, shareReplay, tap, filter, mergeMap, retryWhen, delay, mergeAll, timeout } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

const gunUpdateTime = (value) => {
    const updates = Gun.node.is(value) ? value._['>'] : null;
    if (!updates) {
        return 0;
    }
    return Object.values(updates).reduce((latest, time) => time > latest ? time : latest);
};
const gunChainArray = (value) => {
    let c = value;
    const path = [];
    do {
        if (c._.get) {
            path.push(c);
        }
        else {
            break;
        }
        c = c.back();
    } while (c.back() !== c);
    while (c.back) {
        const back = c.back();
        if (back !== c && c._.get) {
            const key = c._.get;
            path.push(key);
            c = c.back();
        }
        else {
            break;
        }
    }
    return path;
};
const gunCertificateChain = (value) => gunChainArray(value).map((c) => c.get('certs'));
/**
 * Returns an array of keys representing the path of the given chain
 * @param value the chain to pathify
 */
const gunPath = (value) => {
    let c = value;
    const path = [];
    while (c.back) {
        const back = c.back();
        if (back !== c && c._.get) {
            const key = c._.get;
            path.push(key);
            c = c.back();
        }
        else {
            break;
        }
    }
    return path;
};
function parseCertificate(cert) {
    const RE_SEA_CERT = /^SEA/;
    if (!RE_SEA_CERT.test(cert)) {
        throw new Error('could not parse certificate, incorrect prefix');
    }
    const scrubbed = cert.replace(RE_SEA_CERT, '');
    return JSON.parse(scrubbed);
}

const GUN_NODE = Symbol('GUN_NODE');
class GunChain {
    constructor(ngZone, gun) {
        this.ngZone = ngZone;
        this.isNested = false;
        this.certificate$ = new Subject();
        this.certificates = {};
        this.sources = new Map();
        this._auth = null;
        if (!gun) {
            this.gun = new Gun();
        }
        else {
            this.gun = gun;
        }
    }
    get gun() {
        return this._gun;
    }
    set gun(value) {
        var _a;
        this._gun = value;
        const myKey = value._.get;
        const path = gunPath(value);
        const chainArray = gunChainArray(value);
        this.path = path;
        const userPair = this.gun.user().is;
        if (!userPair) {
            // TODO figure out how to handle this case
            return;
        }
        const myPub = `~${(_a = this.gun.user().is) === null || _a === void 0 ? void 0 : _a.pub}`;
        const pubs = path.filter((key) => key.startsWith('~'));
        if (pubs.length === 0 || pubs[0] !== myPub) {
            pubs.push(myPub);
        }
        if (pubs.length > 1) {
            this.isNested = true;
            this.recordPub = pubs[0];
            const firstPub = path.findIndex((key) => key.startsWith('~'));
            const pathFromRecord = [...path];
            const recordPath = pathFromRecord.splice(firstPub).reverse();
            pathFromRecord.reverse();
            if (myKey === this.recordPub) {
                // console.log('sub root', myKey);
            }
            else {
                const keyInRecord = pathFromRecord[0];
                const record = chainArray[firstPub];
                const recordCerts = record.get('certs');
                const pathCerts = recordCerts.get(keyInRecord);
                const myCert = pathCerts.get(userPair.pub);
                // console.log('  %s', keyInRecord);
                myCert.on((cert) => __awaiter(this, void 0, void 0, function* () {
                    if (cert === null || cert === undefined) {
                        return;
                    }
                    // console.log('cert', cert);
                    // TODO verify cert later, the await causes chained put() calls to fail
                    // const verified = await SEA.verify(
                    //   cert,
                    //   this.recordPub.replace('~', '')
                    // );
                    this.certificate = cert;
                    this.certificate$.next(cert);
                    // console.log(
                    //   'verified cert for %s.%s',
                    //   this.recordPub,
                    //   keyInRecord,
                    //   pathFromRecord.join('.')
                    // );
                }));
                this.record = record;
            }
        }
    }
    from(gun) {
        return new GunChain(this.ngZone, gun);
    }
    get(key) {
        const soul = this.getSoul(key);
        return this.from(this.gun.get(soul));
    }
    put(data, certificate = this.certificate) {
        // FIXME "unverified data" - certified put values must be signed?
        if (this.isNested && !certificate) {
            console.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
        }
        const result = this.from(this.gun.put(data, null, certificate ? { opt: { cert: certificate } } : undefined));
        // this.once().subscribe((me) => {
        //   console.log('me', me);
        // });
        return result;
    }
    set(data) {
        // TODO get certificate for set()
        return this.from(this.gun.set(data));
    }
    unset(data) {
        if (this.gun.unset) {
            return this.from(this.gun.unset(data));
        }
        else {
            throw new Error('CANNOT FIND Gun.chain.unset!');
        }
    }
    query(query) {
        return this.from(this.gun.get(query));
    }
    load() {
        // return this.from((this.gun as any).load((d: any) => d) as any);
        return fromEventPattern((handler) => {
            const signal = { stopped: false };
            this.gun.load((data) => {
                const converted = data;
                this.ngZone.run(() => {
                    handler(converted);
                });
            });
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        }).pipe(take(1));
    }
    open() {
        // return this.from((this.gun as any).load((d: any) => d) as any);
        return fromEventPattern((handler) => {
            const signal = { stopped: false };
            this.gun.open((data) => {
                const converted = data;
                this.ngZone.run(() => {
                    handler(converted);
                });
            });
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        }).pipe(debounceTime(25));
    }
    map(options) {
        return this.from(this.gun.map());
    }
    reduce(options) {
        const base = this.from(this.gun.map());
        return base.on({ includeKeys: true }).pipe(scan((acc, val) => {
            if (val[0] === null || undefined === val[0]) {
                delete acc[val[1]];
            }
            else {
                acc[val[1]] = val[0];
            }
            return acc;
        }, {}), map((v) => (options === null || options === void 0 ? void 0 : options.includeNulls) ? v
            : Object.values(v).filter((ov) => ov !== undefined)), debounceTime(100));
    }
    not() {
        return fromEventPattern((handler) => {
            const signal = { stopped: false };
            if (this.gun.not) {
                this.gun.not((key) => {
                    handler(key);
                });
            }
        });
    }
    on(options) {
        return fromEventPattern((handler) => {
            const signal = { stopped: false };
            this.gun.on((data, key, at, ev) => {
                if (signal.stopped) {
                    return ev.off();
                }
                const dispatchHandler = () => {
                    if (options === null || options === void 0 ? void 0 : options.includeKeys) {
                        handler(data, key);
                    }
                    else {
                        handler(data);
                    }
                };
                // FIXME: ngZone.run() causes infinite recursion
                if (options === null || options === void 0 ? void 0 : options.bypassZone) {
                    dispatchHandler();
                }
                else {
                    this.ngZone.run(dispatchHandler);
                }
            }, options);
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        });
    }
    once() {
        return fromEventPattern((handler) => {
            const signal = { stopped: false };
            this.gun.once((data, key, at, ev) => {
                if (ev && signal.stopped) {
                    return ev.off();
                }
                this.ngZone.run(() => {
                    handler(data);
                });
            });
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        }).pipe(take(1));
    }
    auth() {
        if (!this._auth) {
            this._auth = new GunAuthChain(this.ngZone, 
            //// no fix for this... gun.user.is is static! can't have multiple logins on a single gun instance
            // TODO allow option to create a new gun instance for this auth call
            this.gun.user().recall({ sessionStorage: true }), this);
        }
        return this._auth;
    }
    user(pubKey) {
        return this.from(this.gun.user(pubKey === null || pubKey === void 0 ? void 0 : pubKey.replace(/^~/, '')));
    }
    onEvent(event, node = this.gun) {
        if (!this.sources.has(event)) {
            const source = fromEventPattern((handler) => {
                // console.log('add handler');
                node.on(event, (...args) => {
                    this.ngZone.run(() => {
                        handler(...args);
                    });
                });
            }).pipe(shareReplay(1));
            this.sources.set(event, source);
        }
        return this.sources.get(event);
    }
    getSoul(key) {
        return typeof key === 'object' && Gun.node.is(key)
            ? Gun.node.soul(key)
            : key;
    }
}
GunChain.ɵfac = function GunChain_Factory(t) { return new (t || GunChain)(i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(GUN_NODE, 8)); };
GunChain.ɵprov = i0.ɵɵdefineInjectable({ token: GunChain, factory: GunChain.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GunChain, [{
        type: Injectable
    }], function () { return [{ type: i0.NgZone }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [GUN_NODE]
            }] }]; }, null); })();
/** Represents a top-level authenticated node (user or key pair) */
let GunAuthChain = class GunAuthChain extends GunChain {
    constructor(ngZone, gun, root) {
        super(ngZone, gun);
        this.root = root;
        this.auth$ = this.root.onEvent('auth').pipe(tap((ack) => {
            if (!ack.err) {
                this.is = ack.put;
            }
        }), shareReplay(1));
        this.is = gun.is;
    }
    login(alias, pass) {
        const auth$ = this.root.onEvent('auth').pipe(filter((ack) => !ack.err), filter((ack) => {
            return ack.put.alias === alias;
        }), take(1));
        const login$ = fromEventPattern((handler) => {
            const signal = { stopped: false };
            this.gun.auth(alias, pass, (ack) => {
                this.ngZone.run(() => {
                    handler(ack);
                });
            });
            return signal;
        }, (handler, signal) => {
            signal.stopped = true;
        }).pipe(mergeMap((ack) => (ack.wait ? throwError(new Error(ack)) : of(ack))), retryWhen((errors) => errors.pipe(delay(1000), take(10))));
        const loginOrAuth$ = from([auth$, login$]).pipe(mergeAll(), take(1));
        return loginOrAuth$;
    }
    create(alias, pass) {
        const auth$ = this.root.onEvent('auth').pipe(filter((ack) => {
            return ack.put.alias === alias;
        }), take(1));
        this.gun.create(alias, pass);
        return auth$;
    }
    secret(value) {
        if (this.gun.secret) {
            return this.from(this.gun.secret(value));
        }
        throw new Error('GUN.chain.secret NOT FOUND');
    }
    from(gun) {
        return new GunAuthChain(this.ngZone, gun, this.root);
    }
    recall() {
        this.gun.recall({ sessionStorage: true });
        return this.auth$.pipe(timeout(5000));
    }
    logout() {
        this.gun.leave();
    }
    put(data, certificate = this.certificate) {
        return super.put(data, certificate);
    }
};
GunAuthChain = __decorate([
    __param(1, Optional()),
    __param(1, SkipSelf()),
    __param(2, Optional()), __param(2, SkipSelf())
], GunAuthChain);
/** Represents a node nested under a user/pair
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
class GunCertChain extends GunChain {
}

const GunOptions = 'gun-options';
class NgGunService extends GunChain {
    constructor(gunOptions, ngZone) {
        super(ngZone, new Gun(JSON.parse(JSON.stringify(gunOptions))));
        this.gunOptions = gunOptions;
    }
    get peers() {
        return this.gun._.root.opt.peers;
    }
    findAlias(alias) {
        return this.get(`~@${alias}`).once();
    }
}
NgGunService.ɵfac = function NgGunService_Factory(t) { return new (t || NgGunService)(i0.ɵɵinject(GunOptions), i0.ɵɵinject(i0.NgZone)); };
NgGunService.ɵprov = i0.ɵɵdefineInjectable({ token: NgGunService, factory: NgGunService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgGunService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [GunOptions]
            }] }, { type: i0.NgZone }]; }, null); })();

class NgGunComponent {
    constructor() { }
    ngOnInit() {
    }
}
NgGunComponent.ɵfac = function NgGunComponent_Factory(t) { return new (t || NgGunComponent)(); };
NgGunComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgGunComponent, selectors: [["lib-ng-gun"]], decls: 2, vars: 0, template: function NgGunComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "p");
        i0.ɵɵtext(1, " ng-gun works! ");
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgGunComponent, [{
        type: Component,
        args: [{
                selector: 'lib-ng-gun',
                template: `
    <p>
      ng-gun works!
    </p>
  `,
                styles: []
            }]
    }], function () { return []; }, null); })();

class SoulPipe {
    transform(value, ...args) {
        return Gun.node.is(value) ? Gun.node.soul(value) : undefined;
    }
}
SoulPipe.ɵfac = function SoulPipe_Factory(t) { return new (t || SoulPipe)(); };
SoulPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "soul", type: SoulPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SoulPipe, [{
        type: Pipe,
        args: [{
                name: 'soul',
            }]
    }], null, null); })();

class UpdatedPipe {
    transform(value, ...args) {
        const updates = Gun.node.is(value) ? value._['>'] : null;
        if (!updates) {
            return null;
        }
        return Object.values(updates).reduce((latest, time) => (time > latest ? time : latest), 0);
    }
}
UpdatedPipe.ɵfac = function UpdatedPipe_Factory(t) { return new (t || UpdatedPipe)(); };
UpdatedPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "updated", type: UpdatedPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UpdatedPipe, [{
        type: Pipe,
        args: [{
                name: 'updated',
            }]
    }], null, null); })();

class ChainDirective {
    constructor(ngGun) {
        this.ngGun = ngGun;
        this._chain$ = new EventEmitter();
        this.chain$ = this._chain$.pipe(shareReplay(1));
    }
    get chain() {
        return this._chain;
    }
    set chain(value) {
        if (value !== this._chain) {
            this._chain = value;
            this._chain$.emit(value);
        }
    }
}
ChainDirective.ɵfac = function ChainDirective_Factory(t) { return new (t || ChainDirective)(i0.ɵɵdirectiveInject(NgGunService)); };
ChainDirective.ɵdir = i0.ɵɵdefineDirective({ type: ChainDirective, selectors: [["", "gunChain", ""]], inputs: { chain: ["gunChain", "chain"] }, exportAs: ["gunChain"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChainDirective, [{
        type: Directive,
        args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[gunChain]',
                exportAs: 'gunChain',
            }]
    }], function () { return [{ type: NgGunService }]; }, { chain: [{
            type: Input,
            args: ['gunChain']
        }] }); })();

class AliasPipe extends AsyncPipe {
    constructor(ngGun, _ref) {
        super(_ref);
        this.ngGun = ngGun;
    }
    transform(value, ...args) {
        if (value === '*') {
            return of(value);
        }
        return this.ngGun
            .get(`~${value.replace('~', '')}`)
            .on()
            .pipe(map((v) => v.alias || value), shareReplay(1));
    }
}
AliasPipe.ɵfac = function AliasPipe_Factory(t) { return new (t || AliasPipe)(i0.ɵɵdirectiveInject(NgGunService), i0.ɵɵinjectPipeChangeDetectorRef()); };
AliasPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "alias", type: AliasPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AliasPipe, [{
        type: Pipe,
        args: [{
                name: 'alias',
            }]
    }], function () { return [{ type: NgGunService }, { type: i0.ChangeDetectorRef }]; }, null); })();

class NgSeaService {
    constructor() {
        this.SEA = Gun.SEA;
    }
    certify(certificants, policies, authority, options) {
        return from(this.SEA.certify(certificants, policies, authority, null, options));
    }
    certifySelf(pair) {
        return from(this.SEA.certify(pair, '*', pair));
    }
    pair() {
        return from(this.SEA.pair(() => { }));
    }
    getCertStore(certificant, paths, auth, isProtected = false, opts = null) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('certifying', certificant);
            if (Array.isArray(certificant)) {
                const certificantsPromises = certificant.map((c) => __awaiter(this, void 0, void 0, function* () { return yield this.getCertStore(c, paths, auth, isProtected, opts); }));
                const certificants = yield Promise.all(certificantsPromises);
                console.log('certificants', certificants);
                return certificants;
            }
            if (typeof certificant !== 'string') {
                if (typeof certificant !== 'object') {
                    throw new Error('cannot certify provided certificant');
                }
                else if (!certificant.pub) {
                    throw new Error('cannot certify provided certificant');
                }
            }
            const store = {};
            const certPromises = paths.map((path) => __awaiter(this, void 0, void 0, function* () {
                const policy = { '*': path };
                if (isProtected) {
                    policy['+'] = '*';
                }
                const cert = yield this.certify(certificant, policy, auth, opts).toPromise();
                store[path] = {};
                store[path][certificant.pub || certificant] = cert;
            }));
            yield Promise.all(certPromises);
            // console.log('certified', store);
            return store;
        });
    }
}
NgSeaService.ɵfac = function NgSeaService_Factory(t) { return new (t || NgSeaService)(); };
NgSeaService.ɵprov = i0.ɵɵdefineInjectable({ token: NgSeaService, factory: NgSeaService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgSeaService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();

class VerifyPipe extends AsyncPipe {
    constructor(ngGun, sea, ref, chain) {
        super(ref);
        this.ngGun = ngGun;
        this.sea = sea;
        this.ref = ref;
        this.chain = chain;
    }
    transform(value, ...args) {
        var _a;
        if (!this.chain.chain) {
            return null;
        }
        return from(SEA.verify(value, (_a = this.chain.chain) === null || _a === void 0 ? void 0 : _a.recordPub.replace('~', ''))).pipe(
        // tap((v) => console.log('verified', v)),
        tap((v) => this.ref.detectChanges()));
        // ) as any;
    }
}
VerifyPipe.ɵfac = function VerifyPipe_Factory(t) { return new (t || VerifyPipe)(i0.ɵɵdirectiveInject(NgGunService), i0.ɵɵdirectiveInject(NgSeaService), i0.ɵɵinjectPipeChangeDetectorRef(), i0.ɵɵdirectiveInject(ChainDirective, 8)); };
VerifyPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "verify", type: VerifyPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VerifyPipe, [{
        type: Pipe,
        args: [{
                name: 'verify',
            }]
    }], function () { return [{ type: NgGunService }, { type: NgSeaService }, { type: i0.ChangeDetectorRef }, { type: ChainDirective, decorators: [{
                type: Optional
            }] }]; }, null); })();

class NgGunModule {
}
NgGunModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgGunModule });
NgGunModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgGunModule_Factory(t) { return new (t || NgGunModule)(); }, imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgGunModule, { declarations: [NgGunComponent,
        SoulPipe,
        UpdatedPipe,
        ChainDirective,
        AliasPipe,
        VerifyPipe], exports: [NgGunComponent,
        SoulPipe,
        UpdatedPipe,
        ChainDirective,
        AliasPipe,
        VerifyPipe] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgGunModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();

/*
 * Public API Surface of ng-gun
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AliasPipe, ChainDirective, GUN_NODE, GunAuthChain, GunCertChain, GunChain, GunOptions, NgGunComponent, NgGunModule, NgGunService, SoulPipe, UpdatedPipe, VerifyPipe };
//# sourceMappingURL=ng-gun.js.map
