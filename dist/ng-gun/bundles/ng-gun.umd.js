(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('gun'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-gun', ['exports', '@angular/core', 'gun', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ng-gun'] = {}, global.ng.core, global.Gun, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, i0, Gun, rxjs, operators, common) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var Gun__namespace = /*#__PURE__*/_interopNamespace(Gun);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var gunUpdateTime = function (value) {
        var updates = Gun__namespace.node.is(value) ? value._['>'] : null;
        if (!updates) {
            return 0;
        }
        return Object.values(updates).reduce(function (latest, time) { return time > latest ? time : latest; });
    };
    var gunChainArray = function (value) {
        var c = value;
        var path = [];
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
            var back = c.back();
            if (back !== c && c._.get) {
                var key = c._.get;
                path.push(key);
                c = c.back();
            }
            else {
                break;
            }
        }
        return path;
    };
    var gunCertificateChain = function (value) { return gunChainArray(value).map(function (c) { return c.get('certs'); }); };
    /**
     * Returns an array of keys representing the path of the given chain
     * @param value the chain to pathify
     */
    var gunPath = function (value) {
        var c = value;
        var path = [];
        while (c.back) {
            var back = c.back();
            if (back !== c && c._.get) {
                var key = c._.get;
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
        var RE_SEA_CERT = /^SEA/;
        if (!RE_SEA_CERT.test(cert)) {
            throw new Error('could not parse certificate, incorrect prefix');
        }
        var scrubbed = cert.replace(RE_SEA_CERT, '');
        return JSON.parse(scrubbed);
    }

    var GUN_NODE = Symbol('GUN_NODE');
    var GunChain = /** @class */ (function () {
        function GunChain(ngZone, gun) {
            this.ngZone = ngZone;
            this.isNested = false;
            this.certificate$ = new rxjs.Subject();
            this.certificates = {};
            this.sources = new Map();
            this._auth = null;
            if (!gun) {
                this.gun = new Gun__namespace();
            }
            else {
                this.gun = gun;
            }
        }
        Object.defineProperty(GunChain.prototype, "gun", {
            get: function () {
                return this._gun;
            },
            set: function (value) {
                var _this = this;
                var _a;
                this._gun = value;
                var myKey = value._.get;
                var path = gunPath(value);
                var chainArray = gunChainArray(value);
                this.path = path;
                var userPair = this.gun.user().is;
                if (!userPair) {
                    // TODO figure out how to handle this case
                    return;
                }
                var myPub = "~" + ((_a = this.gun.user().is) === null || _a === void 0 ? void 0 : _a.pub);
                var pubs = path.filter(function (key) { return key.startsWith('~'); });
                if (pubs.length === 0 || pubs[0] !== myPub) {
                    pubs.push(myPub);
                }
                if (pubs.length > 1) {
                    this.isNested = true;
                    this.recordPub = pubs[0];
                    var firstPub = path.findIndex(function (key) { return key.startsWith('~'); });
                    var pathFromRecord = __spread(path);
                    var recordPath = pathFromRecord.splice(firstPub).reverse();
                    pathFromRecord.reverse();
                    if (myKey === this.recordPub) {
                        // console.log('sub root', myKey);
                    }
                    else {
                        var keyInRecord = pathFromRecord[0];
                        var record = chainArray[firstPub];
                        var recordCerts = record.get('certs');
                        var pathCerts = recordCerts.get(keyInRecord);
                        var myCert = pathCerts.get(userPair.pub);
                        // console.log('  %s', keyInRecord);
                        myCert.on(function (cert) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                if (cert === null || cert === undefined) {
                                    return [2 /*return*/];
                                }
                                // console.log('cert', cert);
                                // TODO verify cert later, the await causes chained put() calls to fail
                                // const verified = await SEA.verify(
                                //   cert,
                                //   this.recordPub.replace('~', '')
                                // );
                                this.certificate = cert;
                                this.certificate$.next(cert);
                                return [2 /*return*/];
                            });
                        }); });
                        this.record = record;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        GunChain.prototype.from = function (gun) {
            return new GunChain(this.ngZone, gun);
        };
        GunChain.prototype.get = function (key) {
            var soul = this.getSoul(key);
            return this.from(this.gun.get(soul));
        };
        GunChain.prototype.put = function (data, certificate) {
            if (certificate === void 0) { certificate = this.certificate; }
            // FIXME "unverified data" - certified put values must be signed?
            if (this.isNested && !certificate) {
                console.warn('NO CERTIFICATE FOUND FOR FOREIGN RECORD!');
            }
            var result = this.from(this.gun.put(data, null, certificate ? { opt: { cert: certificate } } : undefined));
            // this.once().subscribe((me) => {
            //   console.log('me', me);
            // });
            return result;
        };
        GunChain.prototype.set = function (data) {
            // TODO get certificate for set()
            return this.from(this.gun.set(data));
        };
        GunChain.prototype.unset = function (data) {
            if (this.gun.unset) {
                return this.from(this.gun.unset(data));
            }
            else {
                throw new Error('CANNOT FIND Gun.chain.unset!');
            }
        };
        GunChain.prototype.query = function (query) {
            return this.from(this.gun.get(query));
        };
        GunChain.prototype.load = function () {
            var _this = this;
            // return this.from((this.gun as any).load((d: any) => d) as any);
            return rxjs.fromEventPattern(function (handler) {
                var signal = { stopped: false };
                _this.gun.load(function (data) {
                    var converted = data;
                    _this.ngZone.run(function () {
                        handler(converted);
                    });
                });
                return signal;
            }, function (handler, signal) {
                signal.stopped = true;
            }).pipe(operators.take(1));
        };
        GunChain.prototype.open = function () {
            var _this = this;
            // return this.from((this.gun as any).load((d: any) => d) as any);
            return rxjs.fromEventPattern(function (handler) {
                var signal = { stopped: false };
                _this.gun.open(function (data) {
                    var converted = data;
                    _this.ngZone.run(function () {
                        handler(converted);
                    });
                });
                return signal;
            }, function (handler, signal) {
                signal.stopped = true;
            }).pipe(operators.debounceTime(25));
        };
        GunChain.prototype.map = function (options) {
            return this.from(this.gun.map());
        };
        GunChain.prototype.reduce = function (options) {
            var base = this.from(this.gun.map());
            return base.on({ includeKeys: true }).pipe(operators.scan(function (acc, val) {
                if (val[0] === null || undefined === val[0]) {
                    delete acc[val[1]];
                }
                else {
                    acc[val[1]] = val[0];
                }
                return acc;
            }, {}), operators.map(function (v) { return (options === null || options === void 0 ? void 0 : options.includeNulls) ? v
                : Object.values(v).filter(function (ov) { return ov !== undefined; }); }), operators.debounceTime(100));
        };
        GunChain.prototype.not = function () {
            var _this = this;
            return rxjs.fromEventPattern(function (handler) {
                var signal = { stopped: false };
                if (_this.gun.not) {
                    _this.gun.not(function (key) {
                        handler(key);
                    });
                }
            });
        };
        GunChain.prototype.on = function (options) {
            var _this = this;
            return rxjs.fromEventPattern(function (handler) {
                var signal = { stopped: false };
                _this.gun.on(function (data, key, at, ev) {
                    if (signal.stopped) {
                        return ev.off();
                    }
                    var dispatchHandler = function () {
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
                        _this.ngZone.run(dispatchHandler);
                    }
                }, options);
                return signal;
            }, function (handler, signal) {
                signal.stopped = true;
            });
        };
        GunChain.prototype.once = function () {
            var _this = this;
            return rxjs.fromEventPattern(function (handler) {
                var signal = { stopped: false };
                _this.gun.once(function (data, key, at, ev) {
                    if (ev && signal.stopped) {
                        return ev.off();
                    }
                    _this.ngZone.run(function () {
                        handler(data);
                    });
                });
                return signal;
            }, function (handler, signal) {
                signal.stopped = true;
            }).pipe(operators.take(1));
        };
        GunChain.prototype.auth = function () {
            if (!this._auth) {
                this._auth = new exports.GunAuthChain(this.ngZone, 
                //// no fix for this... gun.user.is is static! can't have multiple logins on a single gun instance
                // TODO allow option to create a new gun instance for this auth call
                this.gun.user().recall({ sessionStorage: true }), this);
            }
            return this._auth;
        };
        GunChain.prototype.user = function (pubKey) {
            return this.from(this.gun.user(pubKey === null || pubKey === void 0 ? void 0 : pubKey.replace(/^~/, '')));
        };
        GunChain.prototype.onEvent = function (event, node) {
            var _this = this;
            if (node === void 0) { node = this.gun; }
            if (!this.sources.has(event)) {
                var source = rxjs.fromEventPattern(function (handler) {
                    // console.log('add handler');
                    node.on(event, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.ngZone.run(function () {
                            handler.apply(void 0, __spread(args));
                        });
                    });
                }).pipe(operators.shareReplay(1));
                this.sources.set(event, source);
            }
            return this.sources.get(event);
        };
        GunChain.prototype.getSoul = function (key) {
            return typeof key === 'object' && Gun__namespace.node.is(key)
                ? Gun__namespace.node.soul(key)
                : key;
        };
        return GunChain;
    }());
    GunChain.ɵfac = function GunChain_Factory(t) { return new (t || GunChain)(i0__namespace.ɵɵinject(i0__namespace.NgZone), i0__namespace.ɵɵinject(GUN_NODE, 8)); };
    GunChain.ɵprov = i0__namespace.ɵɵdefineInjectable({ token: GunChain, factory: GunChain.ɵfac });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(GunChain, [{
                type: i0.Injectable
            }], function () {
            return [{ type: i0__namespace.NgZone }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [GUN_NODE]
                        }] }];
        }, null);
    })();
    /** Represents a top-level authenticated node (user or key pair) */
    exports.GunAuthChain = /** @class */ (function (_super) {
        __extends(GunAuthChain, _super);
        function GunAuthChain(ngZone, gun, root) {
            var _this = _super.call(this, ngZone, gun) || this;
            _this.root = root;
            _this.auth$ = _this.root.onEvent('auth').pipe(operators.tap(function (ack) {
                if (!ack.err) {
                    _this.is = ack.put;
                }
            }), operators.shareReplay(1));
            _this.is = gun.is;
            return _this;
        }
        GunAuthChain.prototype.login = function (alias, pass) {
            var _this = this;
            var auth$ = this.root.onEvent('auth').pipe(operators.filter(function (ack) { return !ack.err; }), operators.filter(function (ack) {
                return ack.put.alias === alias;
            }), operators.take(1));
            var login$ = rxjs.fromEventPattern(function (handler) {
                var signal = { stopped: false };
                _this.gun.auth(alias, pass, function (ack) {
                    _this.ngZone.run(function () {
                        handler(ack);
                    });
                });
                return signal;
            }, function (handler, signal) {
                signal.stopped = true;
            }).pipe(operators.mergeMap(function (ack) { return (ack.wait ? rxjs.throwError(new Error(ack)) : rxjs.of(ack)); }), operators.retryWhen(function (errors) { return errors.pipe(operators.delay(1000), operators.take(10)); }));
            var loginOrAuth$ = rxjs.from([auth$, login$]).pipe(operators.mergeAll(), operators.take(1));
            return loginOrAuth$;
        };
        GunAuthChain.prototype.create = function (alias, pass) {
            var auth$ = this.root.onEvent('auth').pipe(operators.filter(function (ack) {
                return ack.put.alias === alias;
            }), operators.take(1));
            this.gun.create(alias, pass);
            return auth$;
        };
        GunAuthChain.prototype.secret = function (value) {
            if (this.gun.secret) {
                return this.from(this.gun.secret(value));
            }
            throw new Error('GUN.chain.secret NOT FOUND');
        };
        GunAuthChain.prototype.from = function (gun) {
            return new GunAuthChain(this.ngZone, gun, this.root);
        };
        GunAuthChain.prototype.recall = function () {
            this.gun.recall({ sessionStorage: true });
            return this.auth$.pipe(operators.timeout(5000));
        };
        GunAuthChain.prototype.logout = function () {
            this.gun.leave();
        };
        GunAuthChain.prototype.put = function (data, certificate) {
            if (certificate === void 0) { certificate = this.certificate; }
            return _super.prototype.put.call(this, data, certificate);
        };
        return GunAuthChain;
    }(GunChain));
    exports.GunAuthChain = __decorate([
        __param(1, i0.Optional()),
        __param(1, i0.SkipSelf()),
        __param(2, i0.Optional()), __param(2, i0.SkipSelf())
    ], exports.GunAuthChain);
    /** Represents a node nested under a user/pair
     * gun.user() : AuthChain
     * gun.user(pub) : UserChain
     * gun.get('~@alias') : GunChain<{pub: string}>
     */
    var GunCertChain = /** @class */ (function (_super) {
        __extends(GunCertChain, _super);
        function GunCertChain() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GunCertChain;
    }(GunChain));

    var GunOptions = 'gun-options';
    var NgGunService = /** @class */ (function (_super) {
        __extends(NgGunService, _super);
        function NgGunService(gunOptions, ngZone) {
            var _this = _super.call(this, ngZone, new Gun__namespace(JSON.parse(JSON.stringify(gunOptions)))) || this;
            _this.gunOptions = gunOptions;
            return _this;
        }
        Object.defineProperty(NgGunService.prototype, "peers", {
            get: function () {
                return this.gun._.root.opt.peers;
            },
            enumerable: false,
            configurable: true
        });
        NgGunService.prototype.findAlias = function (alias) {
            return this.get("~@" + alias).once();
        };
        return NgGunService;
    }(GunChain));
    NgGunService.ɵfac = function NgGunService_Factory(t) { return new (t || NgGunService)(i0__namespace.ɵɵinject(GunOptions), i0__namespace.ɵɵinject(i0__namespace.NgZone)); };
    NgGunService.ɵprov = i0__namespace.ɵɵdefineInjectable({ token: NgGunService, factory: NgGunService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgGunService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [GunOptions]
                        }] }, { type: i0__namespace.NgZone }];
        }, null);
    })();

    var NgGunComponent = /** @class */ (function () {
        function NgGunComponent() {
        }
        NgGunComponent.prototype.ngOnInit = function () {
        };
        return NgGunComponent;
    }());
    NgGunComponent.ɵfac = function NgGunComponent_Factory(t) { return new (t || NgGunComponent)(); };
    NgGunComponent.ɵcmp = i0__namespace.ɵɵdefineComponent({ type: NgGunComponent, selectors: [["lib-ng-gun"]], decls: 2, vars: 0, template: function NgGunComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "p");
                i0__namespace.ɵɵtext(1, " ng-gun works! ");
                i0__namespace.ɵɵelementEnd();
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgGunComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-ng-gun',
                        template: "\n    <p>\n      ng-gun works!\n    </p>\n  ",
                        styles: []
                    }]
            }], function () { return []; }, null);
    })();

    var AliasPipe = /** @class */ (function (_super) {
        __extends(AliasPipe, _super);
        function AliasPipe(ngGun, _ref) {
            var _this = _super.call(this, _ref) || this;
            _this.ngGun = ngGun;
            return _this;
        }
        AliasPipe.prototype.transform = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (value === '*') {
                return rxjs.of(value);
            }
            return this.ngGun
                .get("~" + value.replace('~', ''))
                .on()
                .pipe(operators.map(function (v) { return v.alias || value; }), operators.shareReplay(1));
        };
        return AliasPipe;
    }(common.AsyncPipe));
    AliasPipe.ɵfac = function AliasPipe_Factory(t) { return new (t || AliasPipe)(i0__namespace.ɵɵdirectiveInject(NgGunService), i0__namespace.ɵɵinjectPipeChangeDetectorRef()); };
    AliasPipe.ɵpipe = i0__namespace.ɵɵdefinePipe({ name: "alias", type: AliasPipe, pure: true });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(AliasPipe, [{
                type: i0.Pipe,
                args: [{
                        name: 'alias',
                    }]
            }], function () { return [{ type: NgGunService }, { type: i0__namespace.ChangeDetectorRef }]; }, null);
    })();

    var ChainDirective = /** @class */ (function () {
        function ChainDirective(ngGun) {
            this.ngGun = ngGun;
            this._chain$ = new i0.EventEmitter();
            this.chain$ = this._chain$.pipe(operators.shareReplay(1));
        }
        Object.defineProperty(ChainDirective.prototype, "chain", {
            get: function () {
                return this._chain;
            },
            set: function (value) {
                if (value !== this._chain) {
                    this._chain = value;
                    this._chain$.emit(value);
                }
            },
            enumerable: false,
            configurable: true
        });
        return ChainDirective;
    }());
    ChainDirective.ɵfac = function ChainDirective_Factory(t) { return new (t || ChainDirective)(i0__namespace.ɵɵdirectiveInject(NgGunService)); };
    ChainDirective.ɵdir = i0__namespace.ɵɵdefineDirective({ type: ChainDirective, selectors: [["", "gunChain", ""]], inputs: { chain: ["gunChain", "chain"] }, exportAs: ["gunChain"] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(ChainDirective, [{
                type: i0.Directive,
                args: [{
                        // tslint:disable-next-line: directive-selector
                        selector: '[gunChain]',
                        exportAs: 'gunChain',
                    }]
            }], function () { return [{ type: NgGunService }]; }, { chain: [{
                    type: i0.Input,
                    args: ['gunChain']
                }] });
    })();

    var SoulPipe = /** @class */ (function () {
        function SoulPipe() {
        }
        SoulPipe.prototype.transform = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return Gun__namespace.node.is(value) ? Gun__namespace.node.soul(value) : undefined;
        };
        return SoulPipe;
    }());
    SoulPipe.ɵfac = function SoulPipe_Factory(t) { return new (t || SoulPipe)(); };
    SoulPipe.ɵpipe = i0__namespace.ɵɵdefinePipe({ name: "soul", type: SoulPipe, pure: true });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(SoulPipe, [{
                type: i0.Pipe,
                args: [{
                        name: 'soul',
                    }]
            }], null, null);
    })();

    var UpdatedPipe = /** @class */ (function () {
        function UpdatedPipe() {
        }
        UpdatedPipe.prototype.transform = function (value) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var updates = Gun__namespace.node.is(value) ? value._['>'] : null;
            if (!updates) {
                return null;
            }
            return Object.values(updates).reduce(function (latest, time) { return (time > latest ? time : latest); }, 0);
        };
        return UpdatedPipe;
    }());
    UpdatedPipe.ɵfac = function UpdatedPipe_Factory(t) { return new (t || UpdatedPipe)(); };
    UpdatedPipe.ɵpipe = i0__namespace.ɵɵdefinePipe({ name: "updated", type: UpdatedPipe, pure: true });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(UpdatedPipe, [{
                type: i0.Pipe,
                args: [{
                        name: 'updated',
                    }]
            }], null, null);
    })();

    var NgSeaService = /** @class */ (function () {
        function NgSeaService() {
            this.SEA = Gun__namespace.SEA;
        }
        NgSeaService.prototype.certify = function (certificants, policies, authority, options) {
            return rxjs.from(this.SEA.certify(certificants, policies, authority, null, options));
        };
        NgSeaService.prototype.certifySelf = function (pair) {
            return rxjs.from(this.SEA.certify(pair, '*', pair));
        };
        NgSeaService.prototype.pair = function () {
            return rxjs.from(this.SEA.pair(function () { }));
        };
        NgSeaService.prototype.getCertStore = function (certificant, paths, auth, isProtected, opts) {
            if (isProtected === void 0) { isProtected = false; }
            if (opts === void 0) { opts = null; }
            return __awaiter(this, void 0, void 0, function () {
                var certificantsPromises, certificants, store, certPromises;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('certifying', certificant);
                            if (!Array.isArray(certificant)) return [3 /*break*/, 2];
                            certificantsPromises = certificant.map(function (c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getCertStore(c, paths, auth, isProtected, opts)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); });
                            return [4 /*yield*/, Promise.all(certificantsPromises)];
                        case 1:
                            certificants = _a.sent();
                            console.log('certificants', certificants);
                            return [2 /*return*/, certificants];
                        case 2:
                            if (typeof certificant !== 'string') {
                                if (typeof certificant !== 'object') {
                                    throw new Error('cannot certify provided certificant');
                                }
                                else if (!certificant.pub) {
                                    throw new Error('cannot certify provided certificant');
                                }
                            }
                            store = {};
                            certPromises = paths.map(function (path) { return __awaiter(_this, void 0, void 0, function () {
                                var policy, cert;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            policy = { '*': path };
                                            if (isProtected) {
                                                policy['+'] = '*';
                                            }
                                            return [4 /*yield*/, this.certify(certificant, policy, auth, opts).toPromise()];
                                        case 1:
                                            cert = _a.sent();
                                            store[path] = {};
                                            store[path][certificant.pub || certificant] = cert;
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(certPromises)];
                        case 3:
                            _a.sent();
                            // console.log('certified', store);
                            return [2 /*return*/, store];
                    }
                });
            });
        };
        return NgSeaService;
    }());
    NgSeaService.ɵfac = function NgSeaService_Factory(t) { return new (t || NgSeaService)(); };
    NgSeaService.ɵprov = i0__namespace.ɵɵdefineInjectable({ token: NgSeaService, factory: NgSeaService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgSeaService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () { return []; }, null);
    })();

    var VerifyPipe = /** @class */ (function (_super) {
        __extends(VerifyPipe, _super);
        function VerifyPipe(ngGun, sea, ref, chain) {
            var _this = _super.call(this, ref) || this;
            _this.ngGun = ngGun;
            _this.sea = sea;
            _this.ref = ref;
            _this.chain = chain;
            return _this;
        }
        VerifyPipe.prototype.transform = function (value) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            if (!this.chain.chain) {
                return null;
            }
            return rxjs.from(Gun.SEA.verify(value, (_a = this.chain.chain) === null || _a === void 0 ? void 0 : _a.recordPub.replace('~', ''))).pipe(
            // tap((v) => console.log('verified', v)),
            operators.tap(function (v) { return _this.ref.detectChanges(); }));
            // ) as any;
        };
        return VerifyPipe;
    }(common.AsyncPipe));
    VerifyPipe.ɵfac = function VerifyPipe_Factory(t) { return new (t || VerifyPipe)(i0__namespace.ɵɵdirectiveInject(NgGunService), i0__namespace.ɵɵdirectiveInject(NgSeaService), i0__namespace.ɵɵinjectPipeChangeDetectorRef(), i0__namespace.ɵɵdirectiveInject(ChainDirective, 8)); };
    VerifyPipe.ɵpipe = i0__namespace.ɵɵdefinePipe({ name: "verify", type: VerifyPipe, pure: true });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(VerifyPipe, [{
                type: i0.Pipe,
                args: [{
                        name: 'verify',
                    }]
            }], function () {
            return [{ type: NgGunService }, { type: NgSeaService }, { type: i0__namespace.ChangeDetectorRef }, { type: ChainDirective, decorators: [{
                            type: i0.Optional
                        }] }];
        }, null);
    })();

    var NgGunModule = /** @class */ (function () {
        function NgGunModule() {
        }
        return NgGunModule;
    }());
    NgGunModule.ɵmod = i0__namespace.ɵɵdefineNgModule({ type: NgGunModule });
    NgGunModule.ɵinj = i0__namespace.ɵɵdefineInjector({ factory: function NgGunModule_Factory(t) { return new (t || NgGunModule)(); } });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(NgGunModule, { declarations: [NgGunComponent,
                SoulPipe,
                UpdatedPipe,
                ChainDirective,
                AliasPipe,
                VerifyPipe], exports: [NgGunComponent,
                SoulPipe,
                UpdatedPipe,
                ChainDirective,
                AliasPipe,
                VerifyPipe] });
    })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(NgGunModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            NgGunComponent,
                            SoulPipe,
                            UpdatedPipe,
                            ChainDirective,
                            AliasPipe,
                            VerifyPipe,
                        ],
                        exports: [
                            NgGunComponent,
                            SoulPipe,
                            UpdatedPipe,
                            ChainDirective,
                            AliasPipe,
                            VerifyPipe,
                        ],
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of ng-gun
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AliasPipe = AliasPipe;
    exports.ChainDirective = ChainDirective;
    exports.GUN_NODE = GUN_NODE;
    exports.GunCertChain = GunCertChain;
    exports.GunChain = GunChain;
    exports.GunOptions = GunOptions;
    exports.NgGunComponent = NgGunComponent;
    exports.NgGunModule = NgGunModule;
    exports.NgGunService = NgGunService;
    exports.SoulPipe = SoulPipe;
    exports.UpdatedPipe = UpdatedPipe;
    exports.VerifyPipe = VerifyPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-gun.umd.js.map
