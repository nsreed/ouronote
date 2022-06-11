import { after, before } from 'aspect-ts';
import { fromEventPattern } from 'rxjs';

export function returned(...args: any[]) {
  const callReturn = args[0];
  return callReturn?.length > 0 ? callReturn[callReturn.length - 1] : null;
}
export function after$(context: any, method: string) {
  return fromEventPattern(
    (handler) => ({
      stop: false,
      listener: after(context, method, (...args: any[]) => {
        handler(...args);
      }),
    }),
    (handler, signal) => {
      if (signal.stop) {
        console.log('tearing down listener %s on', method, context);
        signal.listener();
      }
    }
  );
}
export function before$(context: any, method: string) {
  return fromEventPattern(
    (handler) => ({
      stop: false,
      listener: before(context, method, (...args: any[]) => {
        handler(...args);
      }),
    }),
    (handler, signal) => {
      if (signal.stop) {
        signal.listener();
      }
    }
  );
}
