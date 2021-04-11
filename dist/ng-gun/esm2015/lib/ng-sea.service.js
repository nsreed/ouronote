import { __awaiter } from "tslib";
import { Injectable } from '@angular/core';
import * as Gun from 'gun';
import { from } from 'rxjs';
import * as i0 from "@angular/core";
export class NgSeaService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1ndW4vc3JjL2xpYi9uZy1zZWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQztBQUUzQixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQVk1QixNQUFNLE9BQU8sWUFBWTtJQVV2QjtRQVRBLFFBQUcsR0FRQyxHQUFHLENBQUMsR0FBVSxDQUFDO0lBQ0osQ0FBQztJQUVoQixPQUFPLENBQ0wsWUFBMEIsRUFDMUIsUUFBaUQsRUFDakQsU0FBYyxFQUNkLE9BQTRCO1FBRTVCLE9BQU8sSUFBSSxDQUNULElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FDbkUsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBUztRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELElBQUk7UUFDRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFSyxZQUFZLENBQ2hCLFdBQWdCLEVBQ2hCLEtBQWUsRUFDZixJQUFTLEVBQ1QsV0FBVyxHQUFHLEtBQUssRUFDbkIsT0FBWSxJQUFJOztZQUVoQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN2QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzlCLE1BQU0sb0JBQW9CLEdBQVEsV0FBVyxDQUFDLEdBQUcsQ0FDL0MsQ0FBTyxDQUFDLEVBQUUsRUFBRSxnREFBQyxPQUFBLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUN4RSxDQUFDO2dCQUNGLE1BQU0sWUFBWSxHQUFVLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxZQUFZLENBQUM7YUFDckI7WUFDRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7b0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztpQkFDeEQ7cUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7b0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztpQkFDeEQ7YUFDRjtZQUNELE1BQU0sS0FBSyxHQUFHLEVBQVMsQ0FBQztZQUN4QixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQU8sSUFBWSxFQUFFLEVBQUU7Z0JBQ3BELE1BQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBUyxDQUFDO2dCQUNwQyxJQUFJLFdBQVcsRUFBRTtvQkFDZixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUNuQjtnQkFDRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQzdCLFdBQVcsRUFDWCxNQUFNLEVBQ04sSUFBSSxFQUNKLElBQUksQ0FDTCxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNkLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFTLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNyRCxDQUFDLENBQUEsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hDLG1DQUFtQztZQUNuQyxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7S0FBQTs7d0VBeEVVLFlBQVk7b0RBQVosWUFBWSxXQUFaLFlBQVksbUJBRlgsTUFBTTt1RkFFUCxZQUFZO2NBSHhCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEd1biBmcm9tICdndW4nO1xuaW1wb3J0IHsgSUd1blN0YXRpY1NFQSB9IGZyb20gJ2d1bi90eXBlcy9zdGF0aWMvc2VhJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENlcnRpZmljYW50cywgQ2VydGlmaWNhdGVQb2xpY3kgfSBmcm9tICcuL2NsYXNzZXMvQ2VydGlmaWNhdGUnO1xuaW1wb3J0IHsgbWVyZ2VBbGwsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENlcnRpZmljYXRlT3B0aW9ucyB7XG4gIGVwaXJ5PzogbnVtYmVyO1xuICBibGFja2xpc3Q/OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ1NlYVNlcnZpY2Uge1xuICBTRUE6IElHdW5TdGF0aWNTRUEgJiB7XG4gICAgY2VydGlmeTogKFxuICAgICAgY2VydGlmaWNhbnRzOiBhbnksXG4gICAgICBwb2xpY2llczogYW55LFxuICAgICAgYXV0aG9yaXR5OiBhbnksXG4gICAgICBjYj86IGFueSxcbiAgICAgIG9wdD86IGFueVxuICAgICkgPT4gUHJvbWlzZTxhbnk+O1xuICB9ID0gR3VuLlNFQSBhcyBhbnk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjZXJ0aWZ5KFxuICAgIGNlcnRpZmljYW50czogQ2VydGlmaWNhbnRzLFxuICAgIHBvbGljaWVzOiBDZXJ0aWZpY2F0ZVBvbGljeSB8IENlcnRpZmljYXRlUG9saWN5W10sXG4gICAgYXV0aG9yaXR5OiBhbnksXG4gICAgb3B0aW9ucz86IENlcnRpZmljYXRlT3B0aW9uc1xuICApIHtcbiAgICByZXR1cm4gZnJvbShcbiAgICAgIHRoaXMuU0VBLmNlcnRpZnkoY2VydGlmaWNhbnRzLCBwb2xpY2llcywgYXV0aG9yaXR5LCBudWxsLCBvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICBjZXJ0aWZ5U2VsZihwYWlyOiBhbnkpIHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLlNFQS5jZXJ0aWZ5KHBhaXIsICcqJywgcGFpcikpO1xuICB9XG5cbiAgcGFpcigpIHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLlNFQS5wYWlyKCgpID0+IHt9KSk7XG4gIH1cblxuICBhc3luYyBnZXRDZXJ0U3RvcmUoXG4gICAgY2VydGlmaWNhbnQ6IGFueSxcbiAgICBwYXRoczogc3RyaW5nW10sXG4gICAgYXV0aDogYW55LFxuICAgIGlzUHJvdGVjdGVkID0gZmFsc2UsXG4gICAgb3B0czogYW55ID0gbnVsbFxuICApIHtcbiAgICBjb25zb2xlLmxvZygnY2VydGlmeWluZycsIGNlcnRpZmljYW50KTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjZXJ0aWZpY2FudCkpIHtcbiAgICAgIGNvbnN0IGNlcnRpZmljYW50c1Byb21pc2VzOiBhbnkgPSBjZXJ0aWZpY2FudC5tYXAoXG4gICAgICAgIGFzeW5jIChjKSA9PiBhd2FpdCB0aGlzLmdldENlcnRTdG9yZShjLCBwYXRocywgYXV0aCwgaXNQcm90ZWN0ZWQsIG9wdHMpXG4gICAgICApO1xuICAgICAgY29uc3QgY2VydGlmaWNhbnRzOiBhbnlbXSA9IGF3YWl0IFByb21pc2UuYWxsKGNlcnRpZmljYW50c1Byb21pc2VzKTtcbiAgICAgIGNvbnNvbGUubG9nKCdjZXJ0aWZpY2FudHMnLCBjZXJ0aWZpY2FudHMpO1xuICAgICAgcmV0dXJuIGNlcnRpZmljYW50cztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjZXJ0aWZpY2FudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0eXBlb2YgY2VydGlmaWNhbnQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGNlcnRpZnkgcHJvdmlkZWQgY2VydGlmaWNhbnQnKTtcbiAgICAgIH0gZWxzZSBpZiAoIWNlcnRpZmljYW50LnB1Yikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBjZXJ0aWZ5IHByb3ZpZGVkIGNlcnRpZmljYW50Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0b3JlID0ge30gYXMgYW55O1xuICAgIGNvbnN0IGNlcnRQcm9taXNlcyA9IHBhdGhzLm1hcChhc3luYyAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBwb2xpY3kgPSB7ICcqJzogcGF0aCB9IGFzIGFueTtcbiAgICAgIGlmIChpc1Byb3RlY3RlZCkge1xuICAgICAgICBwb2xpY3lbJysnXSA9ICcqJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNlcnQgPSBhd2FpdCB0aGlzLmNlcnRpZnkoXG4gICAgICAgIGNlcnRpZmljYW50LFxuICAgICAgICBwb2xpY3ksXG4gICAgICAgIGF1dGgsXG4gICAgICAgIG9wdHNcbiAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgICBzdG9yZVtwYXRoXSA9IHt9IGFzIGFueTtcbiAgICAgIHN0b3JlW3BhdGhdW2NlcnRpZmljYW50LnB1YiB8fCBjZXJ0aWZpY2FudF0gPSBjZXJ0O1xuICAgIH0pO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGNlcnRQcm9taXNlcyk7XG4gICAgLy8gY29uc29sZS5sb2coJ2NlcnRpZmllZCcsIHN0b3JlKTtcbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cbn1cbiJdfQ==