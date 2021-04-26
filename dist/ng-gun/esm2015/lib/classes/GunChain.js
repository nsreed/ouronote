import { __awaiter, __decorate, __param } from "tslib";
import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import * as Gun from 'gun';
import { from, fromEventPattern, of, Subject, throwError, } from 'rxjs';
import { debounceTime, delay, filter, map, mergeAll, mergeMap, retryWhen, scan, shareReplay, take, tap, timeout, } from 'rxjs/operators';
import { gunChainArray, gunPath } from '../functions/gun-utils';
import * as i0 from "@angular/core";
export const GUN_NODE = Symbol('GUN_NODE');
export class GunChain {
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
        const userPub = `~${(_a = this.gun.user().is) === null || _a === void 0 ? void 0 : _a.pub}`;
        const pubs = path.filter((key) => key.startsWith('~'));
        if (pubs.length > 0) {
            this.recordPub = pubs[0];
            const firstPub = path.findIndex((k) => k.startsWith('~'));
            this.record = chainArray[firstPub];
            if (this.recordPub.indexOf(userPub) < 0) {
                this.isNested = true;
                const pathFromRecord = [...path];
                const recordPath = pathFromRecord.splice(firstPub).reverse();
                pathFromRecord.reverse();
                if (myKey === this.recordPub) {
                    // console.log('sub root', myKey);
                }
                else {
                    // console.log('foreign key', myKey);
                    const keyInRecord = pathFromRecord[0];
                    const record = chainArray[firstPub];
                    // console.log('record', record);
                    this.record = record;
                    const recordCerts = record.get('certs');
                    const pathCerts = recordCerts.get(keyInRecord);
                    const searchKeys = [userPair.pub, '*'];
                    const myCert = pathCerts.get(userPair.pub);
                    myCert.not(() => {
                        // console.log('no cert found');
                        pathCerts.get('*').once((pubCert) => {
                            if (!pubCert) {
                                // console.warn('no public cert found either');
                            }
                            this.certificate = pubCert;
                            this.certificate$.next(pubCert);
                        });
                    });
                    // console.log('  %s', keyInRecord);
                    myCert.once((cert) => __awaiter(this, void 0, void 0, function* () {
                        if (cert === null || cert === undefined) {
                            console.log('no user cert found, checking for public cert');
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
                }
            }
        }
    }
    get canEdit() {
        return this.certificate !== null && this.certificate !== undefined;
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
        this.gun.put(data, (...putAck) => {
            console.log('putAck', putAck);
        }, certificate ? { opt: { cert: certificate } } : undefined);
        return this;
    }
    set(data, certificate = this.certificate) {
        var _a;
        if (this.isNested && !certificate) {
            console.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
            (_a = this.record) === null || _a === void 0 ? void 0 : _a.get('certs').load((certs) => {
                console.log('all certs:', certs);
            });
        }
        return this.from(this.gun.set(data, null, certificate
            ? {
                opt: {
                    cert: certificate,
                },
            }
            : undefined));
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
    set is(value) {
        this._is = value;
        if (value) {
            this.root
                .get(`~${value.pub}`)
                .get('alias')
                .once()
                .subscribe((alias) => {
                var _a, _b, _c;
                this.alias = (_c = (_b = (_a = this.gun._.root.user) === null || _a === void 0 ? void 0 : _a._) === null || _b === void 0 ? void 0 : _b.put) === null || _c === void 0 ? void 0 : _c.alias;
            });
        }
    }
    get is() {
        return this._is;
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
        // SEA.sign(data, this.is.alias);
        super.put(data, certificate);
        return this;
    }
};
GunAuthChain = __decorate([
    __param(1, Optional()),
    __param(1, SkipSelf()),
    __param(2, Optional()), __param(2, SkipSelf())
], GunAuthChain);
export { GunAuthChain };
/** Represents a node nested under a user/pair
 * gun.user() : AuthChain
 * gun.user(pub) : UserChain
 * gun.get('~@alias') : GunChain<{pub: string}>
 */
export class GunCertChain extends GunChain {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VuQ2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ndW4vc3JjL2xpYi9jbGFzc2VzL0d1bkNoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBVSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBUzNCLE9BQU8sRUFDTCxJQUFJLEVBQ0osZ0JBQWdCLEVBRWhCLEVBQUUsRUFDRixPQUFPLEVBQ1AsVUFBVSxHQUNYLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFNBQVMsRUFDVCxJQUFJLEVBQ0osV0FBVyxFQUNYLElBQUksRUFDSixHQUFHLEVBQ0gsT0FBTyxHQUNSLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFNaEUsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQXVCM0MsTUFBTSxPQUFPLFFBQVE7SUF3R25CLFlBQ1ksTUFBYyxFQUd4QixHQUVjO1FBTEosV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQW5HMUIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUlqQixpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUE0R3JDLGlCQUFZLEdBQWUsRUFBRSxDQUFDO1FBQ3RCLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBMkIsQ0FBQztRQUM3QyxVQUFLLEdBQWdELElBQUksQ0FBQztRQVJoRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBUyxDQUFD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SyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNELEdBQUcsQ0FDRCxJQUVDLEVBQ0QsY0FBc0IsSUFBSSxDQUFDLFdBQVc7UUFFdEMsaUNBQWlDO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUE7QUFuSFksWUFBWTtJQWtDcEIsV0FBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLFdBQUEsUUFBUSxFQUFFLENBQUE7SUFJVixXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxRQUFRLEVBQUUsQ0FBQTtHQXZDZCxZQUFZLENBbUh4QjtTQW5IWSxZQUFZO0FBcUh6Qjs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLFlBQWEsU0FBUSxRQUFRO0NBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBHdW4gZnJvbSAnZ3VuJztcbmltcG9ydCB7IElHdW5DaGFpblJlZmVyZW5jZSB9IGZyb20gJ2d1bi90eXBlcy9jaGFpbic7XG5pbXBvcnQge1xuICBBbHdheXNEaXNhbGxvd2VkVHlwZSxcbiAgQXJyYXlBc1JlY29yZCxcbiAgQXJyYXlPZixcbiAgRGlzYWxsb3dBcnJheSxcbiAgRGlzYWxsb3dQcmltaXRpdmVzLFxufSBmcm9tICdndW4vdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHtcbiAgZnJvbSxcbiAgZnJvbUV2ZW50UGF0dGVybixcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YmplY3QsXG4gIHRocm93RXJyb3IsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVib3VuY2VUaW1lLFxuICBkZWxheSxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIG1lcmdlQWxsLFxuICBtZXJnZU1hcCxcbiAgcmV0cnlXaGVuLFxuICBzY2FuLFxuICBzaGFyZVJlcGxheSxcbiAgdGFrZSxcbiAgdGFwLFxuICB0aW1lb3V0LFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBndW5DaGFpbkFycmF5LCBndW5QYXRoIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2d1bi11dGlscyc7XG5pbXBvcnQgeyBHdW5SdW50aW1lT3B0cyB9IGZyb20gJy4uL0d1blJ1bnRpbWVPcHRzJztcbmltcG9ydCB7IElDZXJ0U3RvcmUgfSBmcm9tICcuL0lDZXJ0U3RvcmUnO1xuaW1wb3J0IHsgTGV4aWNhbFF1ZXJ5IH0gZnJvbSAnLi9MZXhpY2FsUXVlcnknO1xuaW1wb3J0IHsgU0VBIH0gZnJvbSAnZ3VuJztcblxuZXhwb3J0IGNvbnN0IEdVTl9OT0RFID0gU3ltYm9sKCdHVU5fTk9ERScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEd1bkNoYWluQ2FsbGJhY2tPcHRpb25zIHtcbiAgaW5jbHVkZUtleXM/OiBib29sZWFuO1xuICBpbmNsdWRlTnVsbHM/OiBib29sZWFuO1xuICBjaGFuZ2VzPzogYm9vbGVhbjtcbiAgYnlwYXNzWm9uZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3VuQ2hhaW5GdW5jdGlvbnMge1xuICBzZWNyZXQ6ICh2YWx1ZTogYW55KSA9PiBJR3VuQ2hhaW5SZWZlcmVuY2U7XG4gIGdyYW50OiAodmFsdWU6IGFueSkgPT4gSUd1bkNoYWluUmVmZXJlbmNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEd1bkNoYWluTWV0YSB7XG4gIF86IHtcbiAgICByb290OiB7XG4gICAgICBvcHQ6IEd1blJ1bnRpbWVPcHRzO1xuICAgIH07XG4gIH0gJiBhbnk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHdW5DaGFpbjxcbiAgRGF0YVR5cGUgPSBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBSZWZlcmVuY2VLZXkgPSBhbnksXG4gIElzVG9wIGV4dGVuZHMgJ3ByZV9yb290JyB8ICdyb290JyB8IGZhbHNlID0gZmFsc2Vcbj4ge1xuICBwYXRoITogc3RyaW5nW107XG4gIGlzTmVzdGVkID0gZmFsc2U7XG4gIHJlY29yZFB1YiE6IGFueTtcbiAgcmVjb3JkPzogYW55O1xuICBjZXJ0aWZpY2F0ZSE6IHN0cmluZztcbiAgY2VydGlmaWNhdGUkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgX2d1biE6IElHdW5DaGFpblJlZmVyZW5jZTxEYXRhVHlwZSwgUmVmZXJlbmNlS2V5LCBJc1RvcD4gJlxuICAgIEd1bkNoYWluRnVuY3Rpb25zICZcbiAgICBHdW5DaGFpbk1ldGE7XG4gIHB1YmxpYyBnZXQgZ3VuKCk6IElHdW5DaGFpblJlZmVyZW5jZTxEYXRhVHlwZSwgUmVmZXJlbmNlS2V5LCBJc1RvcD4gJlxuICAgIEd1bkNoYWluRnVuY3Rpb25zICZcbiAgICBHdW5DaGFpbk1ldGEge1xuICAgIHJldHVybiB0aGlzLl9ndW47XG4gIH1cbiAgcHVibGljIHNldCBndW4oXG4gICAgdmFsdWU6IElHdW5DaGFpblJlZmVyZW5jZTxEYXRhVHlwZSwgUmVmZXJlbmNlS2V5LCBJc1RvcD4gJlxuICAgICAgR3VuQ2hhaW5GdW5jdGlvbnMgJlxuICAgICAgR3VuQ2hhaW5NZXRhXG4gICkge1xuICAgIHRoaXMuX2d1biA9IHZhbHVlO1xuICAgIGNvbnN0IG15S2V5ID0gKHZhbHVlIGFzIGFueSkuXy5nZXQ7XG5cbiAgICBjb25zdCBwYXRoID0gZ3VuUGF0aCh2YWx1ZSBhcyBhbnkpO1xuICAgIGNvbnN0IGNoYWluQXJyYXkgPSBndW5DaGFpbkFycmF5KHZhbHVlIGFzIGFueSk7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcblxuICAgIGNvbnN0IHVzZXJQYWlyID0gKHRoaXMuZ3VuLnVzZXIoKSBhcyBhbnkpLmlzO1xuICAgIGlmICghdXNlclBhaXIpIHtcbiAgICAgIC8vIFRPRE8gZmlndXJlIG91dCBob3cgdG8gaGFuZGxlIHRoaXMgY2FzZVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHVzZXJQdWIgPSBgfiR7KHRoaXMuZ3VuLnVzZXIoKSBhcyBhbnkpLmlzPy5wdWJ9YDtcbiAgICBjb25zdCBwdWJzID0gcGF0aC5maWx0ZXIoKGtleSkgPT4ga2V5LnN0YXJ0c1dpdGgoJ34nKSk7XG4gICAgaWYgKHB1YnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZWNvcmRQdWIgPSBwdWJzWzBdO1xuICAgICAgY29uc3QgZmlyc3RQdWIgPSBwYXRoLmZpbmRJbmRleCgoaykgPT4gay5zdGFydHNXaXRoKCd+JykpO1xuICAgICAgdGhpcy5yZWNvcmQgPSBjaGFpbkFycmF5W2ZpcnN0UHViXTtcblxuICAgICAgaWYgKHRoaXMucmVjb3JkUHViLmluZGV4T2YodXNlclB1YikgPCAwKSB7XG4gICAgICAgIHRoaXMuaXNOZXN0ZWQgPSB0cnVlO1xuICAgICAgICBjb25zdCBwYXRoRnJvbVJlY29yZCA9IFsuLi5wYXRoXTtcbiAgICAgICAgY29uc3QgcmVjb3JkUGF0aCA9IHBhdGhGcm9tUmVjb3JkLnNwbGljZShmaXJzdFB1YikucmV2ZXJzZSgpO1xuICAgICAgICBwYXRoRnJvbVJlY29yZC5yZXZlcnNlKCk7XG5cbiAgICAgICAgaWYgKG15S2V5ID09PSB0aGlzLnJlY29yZFB1Yikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWIgcm9vdCcsIG15S2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZm9yZWlnbiBrZXknLCBteUtleSk7XG4gICAgICAgICAgY29uc3Qga2V5SW5SZWNvcmQgPSBwYXRoRnJvbVJlY29yZFswXTtcbiAgICAgICAgICBjb25zdCByZWNvcmQgPSBjaGFpbkFycmF5W2ZpcnN0UHViXTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVjb3JkJywgcmVjb3JkKTtcblxuICAgICAgICAgIHRoaXMucmVjb3JkID0gcmVjb3JkO1xuICAgICAgICAgIGNvbnN0IHJlY29yZENlcnRzID0gcmVjb3JkLmdldCgnY2VydHMnKTtcbiAgICAgICAgICBjb25zdCBwYXRoQ2VydHMgPSByZWNvcmRDZXJ0cy5nZXQoa2V5SW5SZWNvcmQpO1xuICAgICAgICAgIGNvbnN0IHNlYXJjaEtleXMgPSBbdXNlclBhaXIucHViLCAnKiddO1xuICAgICAgICAgIGNvbnN0IG15Q2VydCA9IHBhdGhDZXJ0cy5nZXQodXNlclBhaXIucHViKTtcbiAgICAgICAgICBteUNlcnQubm90KCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdubyBjZXJ0IGZvdW5kJyk7XG4gICAgICAgICAgICBwYXRoQ2VydHMuZ2V0KCcqJykub25jZSgocHViQ2VydDogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGlmICghcHViQ2VydCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUud2Fybignbm8gcHVibGljIGNlcnQgZm91bmQgZWl0aGVyJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5jZXJ0aWZpY2F0ZSA9IHB1YkNlcnQ7XG4gICAgICAgICAgICAgIHRoaXMuY2VydGlmaWNhdGUkLm5leHQocHViQ2VydCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnICAlcycsIGtleUluUmVjb3JkKTtcbiAgICAgICAgICBteUNlcnQub25jZShhc3luYyAoY2VydDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoY2VydCA9PT0gbnVsbCB8fCBjZXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIHVzZXIgY2VydCBmb3VuZCwgY2hlY2tpbmcgZm9yIHB1YmxpYyBjZXJ0Jyk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjZXJ0JywgY2VydCk7XG4gICAgICAgICAgICAvLyBUT0RPIHZlcmlmeSBjZXJ0IGxhdGVyLCB0aGUgYXdhaXQgY2F1c2VzIGNoYWluZWQgcHV0KCkgY2FsbHMgdG8gZmFpbFxuICAgICAgICAgICAgLy8gY29uc3QgdmVyaWZpZWQgPSBhd2FpdCBTRUEudmVyaWZ5KFxuICAgICAgICAgICAgLy8gICBjZXJ0LFxuICAgICAgICAgICAgLy8gICB0aGlzLnJlY29yZFB1Yi5yZXBsYWNlKCd+JywgJycpXG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgdGhpcy5jZXJ0aWZpY2F0ZSA9IGNlcnQ7XG4gICAgICAgICAgICB0aGlzLmNlcnRpZmljYXRlJC5uZXh0KGNlcnQpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgICAvLyAgICd2ZXJpZmllZCBjZXJ0IGZvciAlcy4lcycsXG4gICAgICAgICAgICAvLyAgIHRoaXMucmVjb3JkUHViLFxuICAgICAgICAgICAgLy8gICBrZXlJblJlY29yZCxcbiAgICAgICAgICAgIC8vICAgcGF0aEZyb21SZWNvcmQuam9pbignLicpXG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBjYW5FZGl0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNlcnRpZmljYXRlICE9PSBudWxsICYmIHRoaXMuY2VydGlmaWNhdGUgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBuZ1pvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoR1VOX05PREUpXG4gICAgZ3VuOiBJR3VuQ2hhaW5SZWZlcmVuY2U8RGF0YVR5cGUsIFJlZmVyZW5jZUtleSwgSXNUb3A+ICZcbiAgICAgIEd1bkNoYWluRnVuY3Rpb25zICZcbiAgICAgIEd1bkNoYWluTWV0YVxuICApIHtcbiAgICBpZiAoIWd1bikge1xuICAgICAgdGhpcy5ndW4gPSBuZXcgR3VuKCkgYXMgYW55O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmd1biA9IGd1bjtcbiAgICB9XG4gIH1cbiAgY2VydGlmaWNhdGVzOiBJQ2VydFN0b3JlID0ge307XG4gIHByaXZhdGUgc291cmNlcyA9IG5ldyBNYXA8c3RyaW5nLCBPYnNlcnZhYmxlPGFueT4+KCk7XG4gIHByaXZhdGUgX2F1dGg6IEd1bkF1dGhDaGFpbjxEYXRhVHlwZSwgUmVmZXJlbmNlS2V5PiB8IG51bGwgPSBudWxsO1xuXG4gIGZyb208VD4oZ3VuOiBJR3VuQ2hhaW5SZWZlcmVuY2U8VD4pIHtcbiAgICByZXR1cm4gbmV3IEd1bkNoYWluPFQ+KHRoaXMubmdab25lLCBndW4gYXMgYW55KTtcbiAgfVxuXG4gIGdldDxLIGV4dGVuZHMga2V5b2YgRGF0YVR5cGU+KFxuICAgIGtleTogQXJyYXlPZjxEYXRhVHlwZT4gZXh0ZW5kcyBuZXZlciA/IEsgOiBBcnJheU9mPERhdGFUeXBlPlxuICApIHtcbiAgICBjb25zdCBzb3VsOiBBcnJheU9mPERhdGFUeXBlPiBleHRlbmRzIG5ldmVyXG4gICAgICA/IEtcbiAgICAgIDogQXJyYXlPZjxEYXRhVHlwZT4gPSB0aGlzLmdldFNvdWwoa2V5KTtcbiAgICByZXR1cm4gdGhpcy5mcm9tKHRoaXMuZ3VuLmdldChzb3VsKSk7XG4gIH1cblxuICBwdXQoXG4gICAgZGF0YTogUGFydGlhbDxcbiAgICAgIEFsd2F5c0Rpc2FsbG93ZWRUeXBlPERpc2FsbG93UHJpbWl0aXZlczxJc1RvcCwgRGlzYWxsb3dBcnJheTxEYXRhVHlwZT4+PlxuICAgID4sXG4gICAgY2VydGlmaWNhdGU6IHN0cmluZyA9IHRoaXMuY2VydGlmaWNhdGVcbiAgKSB7XG4gICAgLy8gRklYTUUgXCJ1bnZlcmlmaWVkIGRhdGFcIiAtIGNlcnRpZmllZCBwdXQgdmFsdWVzIG11c3QgYmUgc2lnbmVkP1xuXG4gICAgaWYgKHRoaXMuaXNOZXN0ZWQgJiYgIWNlcnRpZmljYXRlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ05PIENFUlRJRklDQVRFIEZPVU5EIEZPUiBGT1JFSUdOIFJFQ09SRCEnKTtcbiAgICB9XG4gICAgKHRoaXMuZ3VuLnB1dCBhcyBhbnkpKFxuICAgICAgZGF0YSxcbiAgICAgICguLi5wdXRBY2s6IGFueVtdKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwdXRBY2snLCBwdXRBY2spO1xuICAgICAgfSxcbiAgICAgIGNlcnRpZmljYXRlID8geyBvcHQ6IHsgY2VydDogY2VydGlmaWNhdGUgfSB9IDogdW5kZWZpbmVkXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldChcbiAgICBkYXRhOiBBbHdheXNEaXNhbGxvd2VkVHlwZTxcbiAgICAgIERhdGFUeXBlIGV4dGVuZHMgQXJyYXk8aW5mZXIgVT5cbiAgICAgICAgPyBVIGV4dGVuZHMge1xuICAgICAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xuICAgICAgICAgICAgW2tleTogbnVtYmVyXTogYW55O1xuICAgICAgICAgIH1cbiAgICAgICAgICA/IEFycmF5T2Y8RGF0YVR5cGU+XG4gICAgICAgICAgOiBuZXZlclxuICAgICAgICA6IG5ldmVyXG4gICAgPixcbiAgICBjZXJ0aWZpY2F0ZTogc3RyaW5nID0gdGhpcy5jZXJ0aWZpY2F0ZVxuICApIHtcbiAgICBpZiAodGhpcy5pc05lc3RlZCAmJiAhY2VydGlmaWNhdGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignTk8gQ0VSVElGSUNBVEUgRk9VTkQgRk9SIEZPUkVJR04gUkVDT1JEIScpO1xuICAgICAgdGhpcy5yZWNvcmQ/LmdldCgnY2VydHMnKS5sb2FkKChjZXJ0czogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhbGwgY2VydHM6JywgY2VydHMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZyb20oXG4gICAgICB0aGlzLmd1bi5zZXQoXG4gICAgICAgIGRhdGEsXG4gICAgICAgIG51bGwsXG4gICAgICAgIGNlcnRpZmljYXRlXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIG9wdDoge1xuICAgICAgICAgICAgICAgIGNlcnQ6IGNlcnRpZmljYXRlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHVuc2V0KGRhdGE6IEFycmF5T2Y8RGF0YVR5cGU+KSB7XG4gICAgaWYgKHRoaXMuZ3VuLnVuc2V0KSB7XG4gICAgICByZXR1cm4gdGhpcy5mcm9tKHRoaXMuZ3VuLnVuc2V0KGRhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDQU5OT1QgRklORCBHdW4uY2hhaW4udW5zZXQhJyk7XG4gICAgfVxuICB9XG5cbiAgcXVlcnkocXVlcnk6IExleGljYWxRdWVyeSk6IEd1bkNoYWluPERhdGFUeXBlLCBSZWZlcmVuY2VLZXksIElzVG9wPiB7XG4gICAgcmV0dXJuIHRoaXMuZnJvbSh0aGlzLmd1bi5nZXQocXVlcnkgYXMgYW55KSkgYXMgYW55O1xuICB9XG5cbiAgbG9hZCgpIHtcbiAgICAvLyByZXR1cm4gdGhpcy5mcm9tKCh0aGlzLmd1biBhcyBhbnkpLmxvYWQoKGQ6IGFueSkgPT4gZCkgYXMgYW55KTtcbiAgICByZXR1cm4gZnJvbUV2ZW50UGF0dGVybihcbiAgICAgIChoYW5kbGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHNpZ25hbCA9IHsgc3RvcHBlZDogZmFsc2UgfTtcbiAgICAgICAgKHRoaXMuZ3VuIGFzIGFueSkubG9hZCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udmVydGVkID0gZGF0YTtcbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlcihjb252ZXJ0ZWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNpZ25hbDtcbiAgICAgIH0sXG4gICAgICAoaGFuZGxlciwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHNpZ25hbC5zdG9wcGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICApLnBpcGUodGFrZSgxKSk7XG4gIH1cbiAgb3BlbigpIHtcbiAgICAvLyByZXR1cm4gdGhpcy5mcm9tKCh0aGlzLmd1biBhcyBhbnkpLmxvYWQoKGQ6IGFueSkgPT4gZCkgYXMgYW55KTtcbiAgICByZXR1cm4gZnJvbUV2ZW50UGF0dGVybihcbiAgICAgIChoYW5kbGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHNpZ25hbCA9IHsgc3RvcHBlZDogZmFsc2UgfTtcbiAgICAgICAgKHRoaXMuZ3VuIGFzIGFueSkub3BlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udmVydGVkID0gZGF0YTtcbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlcihjb252ZXJ0ZWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNpZ25hbDtcbiAgICAgIH0sXG4gICAgICAoaGFuZGxlciwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHNpZ25hbC5zdG9wcGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICApLnBpcGUoZGVib3VuY2VUaW1lKDI1KSk7XG4gIH1cblxuICBtYXAob3B0aW9ucz86IEd1bkNoYWluQ2FsbGJhY2tPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZnJvbSh0aGlzLmd1bi5tYXAoKSk7XG4gIH1cblxuICByZWR1Y2Uob3B0aW9ucz86IEd1bkNoYWluQ2FsbGJhY2tPcHRpb25zKSB7XG4gICAgY29uc3QgYmFzZSA9IHRoaXMuZnJvbSh0aGlzLmd1bi5tYXAoKSk7XG5cbiAgICByZXR1cm4gYmFzZS5vbih7IGluY2x1ZGVLZXlzOiB0cnVlIH0pLnBpcGUoXG4gICAgICBzY2FuKChhY2M6IGFueSwgdmFsOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHZhbFswXSA9PT0gbnVsbCB8fCB1bmRlZmluZWQgPT09IHZhbFswXSkge1xuICAgICAgICAgIGRlbGV0ZSBhY2NbdmFsWzFdXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY2NbdmFsWzFdXSA9IHZhbFswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30gYXMgRGF0YVR5cGVbXSksXG4gICAgICBtYXAoKHYpID0+XG4gICAgICAgIG9wdGlvbnM/LmluY2x1ZGVOdWxsc1xuICAgICAgICAgID8gdlxuICAgICAgICAgIDogT2JqZWN0LnZhbHVlcyh2KS5maWx0ZXIoKG92KSA9PiBvdiAhPT0gdW5kZWZpbmVkKVxuICAgICAgKSxcbiAgICAgIGRlYm91bmNlVGltZSgxMDApXG4gICAgKTtcbiAgfVxuXG4gIG5vdCgpIHtcbiAgICByZXR1cm4gZnJvbUV2ZW50UGF0dGVybigoaGFuZGxlcikgPT4ge1xuICAgICAgY29uc3Qgc2lnbmFsID0geyBzdG9wcGVkOiBmYWxzZSB9O1xuICAgICAgaWYgKHRoaXMuZ3VuLm5vdCkge1xuICAgICAgICB0aGlzLmd1bi5ub3QoKGtleTogUmVmZXJlbmNlS2V5KSA9PiB7XG4gICAgICAgICAgaGFuZGxlcihrZXkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uKFxuICAgIG9wdGlvbnM/OiBHdW5DaGFpbkNhbGxiYWNrT3B0aW9uc1xuICApOiBPYnNlcnZhYmxlPEFsd2F5c0Rpc2FsbG93ZWRUeXBlPEFycmF5QXNSZWNvcmQ8RGF0YVR5cGU+Pj4ge1xuICAgIHJldHVybiBmcm9tRXZlbnRQYXR0ZXJuKFxuICAgICAgKGhhbmRsZXIpID0+IHtcbiAgICAgICAgY29uc3Qgc2lnbmFsID0geyBzdG9wcGVkOiBmYWxzZSB9O1xuICAgICAgICB0aGlzLmd1bi5vbihcbiAgICAgICAgICAoXG4gICAgICAgICAgICBkYXRhOiBBbHdheXNEaXNhbGxvd2VkVHlwZTxBcnJheUFzUmVjb3JkPERhdGFUeXBlPj4sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBhdD86IGFueSxcbiAgICAgICAgICAgIGV2PzogYW55XG4gICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2lnbmFsLnN0b3BwZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV2Lm9mZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGlzcGF0Y2hIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAob3B0aW9ucz8uaW5jbHVkZUtleXMpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGRhdGEsIGtleSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIEZJWE1FOiBuZ1pvbmUucnVuKCkgY2F1c2VzIGluZmluaXRlIHJlY3Vyc2lvblxuICAgICAgICAgICAgaWYgKG9wdGlvbnM/LmJ5cGFzc1pvbmUpIHtcbiAgICAgICAgICAgICAgZGlzcGF0Y2hIYW5kbGVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oZGlzcGF0Y2hIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdGlvbnMgYXMgYW55XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBzaWduYWw7XG4gICAgICB9LFxuICAgICAgKGhhbmRsZXIsIHNpZ25hbCkgPT4ge1xuICAgICAgICBzaWduYWwuc3RvcHBlZCA9IHRydWU7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG9uY2UoKSB7XG4gICAgcmV0dXJuIGZyb21FdmVudFBhdHRlcm4oXG4gICAgICAoaGFuZGxlcikgPT4ge1xuICAgICAgICBjb25zdCBzaWduYWwgPSB7IHN0b3BwZWQ6IGZhbHNlIH07XG4gICAgICAgIHRoaXMuZ3VuLm9uY2UoXG4gICAgICAgICAgKFxuICAgICAgICAgICAgZGF0YTpcbiAgICAgICAgICAgICAgfCBBbHdheXNEaXNhbGxvd2VkVHlwZTxBcnJheUFzUmVjb3JkPERhdGFUeXBlPj5cbiAgICAgICAgICAgICAgfCBEaXNhbGxvd1ByaW1pdGl2ZXM8XG4gICAgICAgICAgICAgICAgICBJc1RvcCxcbiAgICAgICAgICAgICAgICAgIEFsd2F5c0Rpc2FsbG93ZWRUeXBlPEFycmF5QXNSZWNvcmQ8RGF0YVR5cGU+PlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgfCB1bmRlZmluZWQsXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBhdD86IGFueSxcbiAgICAgICAgICAgIGV2PzogYW55XG4gICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXYgJiYgc2lnbmFsLnN0b3BwZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV2Lm9mZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgaGFuZGxlcihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHNpZ25hbDtcbiAgICAgIH0sXG4gICAgICAoaGFuZGxlciwgc2lnbmFsKSA9PiB7XG4gICAgICAgIHNpZ25hbC5zdG9wcGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICApLnBpcGUodGFrZSgxKSk7XG4gIH1cblxuICBhdXRoKCkge1xuICAgIGlmICghdGhpcy5fYXV0aCkge1xuICAgICAgdGhpcy5fYXV0aCA9IG5ldyBHdW5BdXRoQ2hhaW48RGF0YVR5cGUsIFJlZmVyZW5jZUtleT4oXG4gICAgICAgIHRoaXMubmdab25lLFxuICAgICAgICAvLy8vIG5vIGZpeCBmb3IgdGhpcy4uLiBndW4udXNlci5pcyBpcyBzdGF0aWMhIGNhbid0IGhhdmUgbXVsdGlwbGUgbG9naW5zIG9uIGEgc2luZ2xlIGd1biBpbnN0YW5jZVxuICAgICAgICAvLyBUT0RPIGFsbG93IG9wdGlvbiB0byBjcmVhdGUgYSBuZXcgZ3VuIGluc3RhbmNlIGZvciB0aGlzIGF1dGggY2FsbFxuICAgICAgICB0aGlzLmd1bi51c2VyKCkucmVjYWxsKHsgc2Vzc2lvblN0b3JhZ2U6IHRydWUgfSkgYXMgYW55LFxuICAgICAgICB0aGlzIGFzIGFueVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2F1dGg7XG4gIH1cblxuICB1c2VyKHB1YktleT86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZyb20odGhpcy5ndW4udXNlcihwdWJLZXk/LnJlcGxhY2UoL15+LywgJycpKSk7XG4gIH1cblxuICBvbkV2ZW50KGV2ZW50OiBzdHJpbmcsIG5vZGUgPSB0aGlzLmd1bik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZXMuaGFzKGV2ZW50KSkge1xuICAgICAgY29uc3Qgc291cmNlID0gZnJvbUV2ZW50UGF0dGVybigoaGFuZGxlcikgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWRkIGhhbmRsZXInKTtcbiAgICAgICAgKG5vZGUgYXMgYW55KS5vbihldmVudCwgKC4uLmFyZ3M6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVyKC4uLmFyZ3MpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICAgICAgdGhpcy5zb3VyY2VzLnNldChldmVudCwgc291cmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc291cmNlcy5nZXQoZXZlbnQpIGFzIE9ic2VydmFibGU8YW55PjtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTb3VsKGtleTogYW55KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmIEd1bi5ub2RlLmlzKGtleSlcbiAgICAgID8gKEd1bi5ub2RlLnNvdWwoa2V5KSBhcyBhbnkpXG4gICAgICA6IGtleTtcbiAgfVxufVxuXG4vKiogUmVwcmVzZW50cyBhIHRvcC1sZXZlbCBhdXRoZW50aWNhdGVkIG5vZGUgKHVzZXIgb3Iga2V5IHBhaXIpICovXG5leHBvcnQgY2xhc3MgR3VuQXV0aENoYWluPFxuICBEYXRhVHlwZSA9IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gIFJlZmVyZW5jZUtleSA9IGFueSxcbiAgSXNUb3AgPSBmYWxzZVxuPiBleHRlbmRzIEd1bkNoYWluPERhdGFUeXBlLCBSZWZlcmVuY2VLZXksIGZhbHNlPiB7XG4gIHByaXZhdGUgX2lzOiBhbnk7XG4gIHNldCBpcyh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5faXMgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5yb290XG4gICAgICAgIC5nZXQoYH4ke3ZhbHVlLnB1Yn1gKVxuICAgICAgICAuZ2V0KCdhbGlhcycpXG4gICAgICAgIC5vbmNlKClcbiAgICAgICAgLnN1YnNjcmliZSgoYWxpYXM6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMuYWxpYXMgPSB0aGlzLmd1bi5fLnJvb3QudXNlcj8uXz8ucHV0Py5hbGlhcztcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGdldCBpcygpIHtcbiAgICByZXR1cm4gdGhpcy5faXM7XG4gIH1cbiAgYWxpYXMhOiBzdHJpbmc7XG4gIGF1dGgkID0gdGhpcy5yb290Lm9uRXZlbnQoJ2F1dGgnKS5waXBlKFxuICAgIHRhcCgoYWNrKSA9PiB7XG4gICAgICBpZiAoIWFjay5lcnIpIHtcbiAgICAgICAgdGhpcy5pcyA9IGFjay5wdXQ7XG4gICAgICB9XG4gICAgfSksXG4gICAgc2hhcmVSZXBsYXkoMSlcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBTa2lwU2VsZigpXG4gICAgZ3VuOiBJR3VuQ2hhaW5SZWZlcmVuY2U8RGF0YVR5cGUsIFJlZmVyZW5jZUtleSwgZmFsc2U+ICZcbiAgICAgIFBhcnRpYWw8R3VuQ2hhaW5GdW5jdGlvbnM+ICZcbiAgICAgIFBhcnRpYWw8R3VuQ2hhaW5NZXRhPixcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwdWJsaWMgcm9vdDogR3VuQ2hhaW5cbiAgKSB7XG4gICAgc3VwZXIobmdab25lLCBndW4gYXMgYW55KTtcbiAgICB0aGlzLmlzID0gKGd1biBhcyBhbnkpLmlzO1xuICB9XG5cbiAgbG9naW4oYWxpYXM6IHN0cmluZywgcGFzczogc3RyaW5nKSB7XG4gICAgY29uc3QgYXV0aCQgPSB0aGlzLnJvb3Qub25FdmVudCgnYXV0aCcpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGFjaykgPT4gIWFjay5lcnIpLFxuICAgICAgZmlsdGVyKChhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIGFjay5wdXQuYWxpYXMgPT09IGFsaWFzO1xuICAgICAgfSksXG4gICAgICB0YWtlKDEpXG4gICAgKTtcblxuICAgIGNvbnN0IGxvZ2luJCA9IGZyb21FdmVudFBhdHRlcm4oXG4gICAgICAoaGFuZGxlcikgPT4ge1xuICAgICAgICBjb25zdCBzaWduYWwgPSB7IHN0b3BwZWQ6IGZhbHNlIH07XG4gICAgICAgIHRoaXMuZ3VuLmF1dGgoYWxpYXMsIHBhc3MsIChhY2s6IGFueSkgPT4ge1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVyKGFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2lnbmFsO1xuICAgICAgfSxcbiAgICAgIChoYW5kbGVyLCBzaWduYWwpID0+IHtcbiAgICAgICAgc2lnbmFsLnN0b3BwZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICkucGlwZShcbiAgICAgIG1lcmdlTWFwKChhY2s6IGFueSkgPT4gKGFjay53YWl0ID8gdGhyb3dFcnJvcihuZXcgRXJyb3IoYWNrKSkgOiBvZihhY2spKSksXG4gICAgICByZXRyeVdoZW4oKGVycm9ycykgPT4gZXJyb3JzLnBpcGUoZGVsYXkoMTAwMCksIHRha2UoMTApKSlcbiAgICApO1xuICAgIGNvbnN0IGxvZ2luT3JBdXRoJCA9IGZyb20oW2F1dGgkLCBsb2dpbiRdKS5waXBlKG1lcmdlQWxsKCksIHRha2UoMSkpO1xuICAgIHJldHVybiBsb2dpbk9yQXV0aCQ7XG4gIH1cblxuICBjcmVhdGUoYWxpYXM6IHN0cmluZywgcGFzczogc3RyaW5nKSB7XG4gICAgY29uc3QgYXV0aCQgPSB0aGlzLnJvb3Qub25FdmVudCgnYXV0aCcpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGFjaykgPT4ge1xuICAgICAgICByZXR1cm4gYWNrLnB1dC5hbGlhcyA9PT0gYWxpYXM7XG4gICAgICB9KSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICAgIHRoaXMuZ3VuLmNyZWF0ZShhbGlhcywgcGFzcyk7XG4gICAgcmV0dXJuIGF1dGgkO1xuICB9XG5cbiAgc2VjcmV0KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5ndW4uc2VjcmV0KSB7XG4gICAgICByZXR1cm4gdGhpcy5mcm9tKHRoaXMuZ3VuLnNlY3JldCh2YWx1ZSkpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0dVTi5jaGFpbi5zZWNyZXQgTk9UIEZPVU5EJyk7XG4gIH1cblxuICBmcm9tPFQ+KGd1bjogSUd1bkNoYWluUmVmZXJlbmNlPFQ+KSB7XG4gICAgcmV0dXJuIG5ldyBHdW5BdXRoQ2hhaW48VD4odGhpcy5uZ1pvbmUsIGd1biwgdGhpcy5yb290KTtcbiAgfVxuXG4gIHJlY2FsbCgpIHtcbiAgICB0aGlzLmd1bi5yZWNhbGwoeyBzZXNzaW9uU3RvcmFnZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gdGhpcy5hdXRoJC5waXBlKHRpbWVvdXQoNTAwMCkpO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIHRoaXMuZ3VuLmxlYXZlKCk7XG4gIH1cbiAgcHV0KFxuICAgIGRhdGE6IFBhcnRpYWw8XG4gICAgICBBbHdheXNEaXNhbGxvd2VkVHlwZTxEaXNhbGxvd1ByaW1pdGl2ZXM8SXNUb3AsIERpc2FsbG93QXJyYXk8RGF0YVR5cGU+Pj5cbiAgICA+LFxuICAgIGNlcnRpZmljYXRlOiBzdHJpbmcgPSB0aGlzLmNlcnRpZmljYXRlXG4gICkge1xuICAgIC8vIFNFQS5zaWduKGRhdGEsIHRoaXMuaXMuYWxpYXMpO1xuICAgIHN1cGVyLnB1dChkYXRhLCBjZXJ0aWZpY2F0ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqIFJlcHJlc2VudHMgYSBub2RlIG5lc3RlZCB1bmRlciBhIHVzZXIvcGFpclxuICogZ3VuLnVzZXIoKSA6IEF1dGhDaGFpblxuICogZ3VuLnVzZXIocHViKSA6IFVzZXJDaGFpblxuICogZ3VuLmdldCgnfkBhbGlhcycpIDogR3VuQ2hhaW48e3B1Yjogc3RyaW5nfT5cbiAqL1xuZXhwb3J0IGNsYXNzIEd1bkNlcnRDaGFpbiBleHRlbmRzIEd1bkNoYWluIHt9XG4iXX0=