import { after, before } from 'aspect-ts';
import { fromEventPattern } from 'rxjs';

export function returned(...args: any[]) {
  const callReturn = args[0];
  return callReturn?.length > 0 ? callReturn[callReturn.length - 1] : null;
}
export function after$(context: any, method: string) {
  return fromEventPattern(
    (handler) => {
      const listener = after(context, method, (...args: any[]) => {
        handler(...args);
      });
      const signal = {
        stop: false,
        listener,
      };
      return signal;
    },
    (handler, signal) => {
      if (signal.stop) {
        signal.listener();
      }
    }
  );
}
export function before$(context: any, method: string) {
  return fromEventPattern(
    (handler) => {
      const listener = before(context, method, (...args: any[]) => {
        handler(...args);
      });
      const signal = {
        stop: false,
        listener,
      };
      return signal;
    },
    (handler, signal) => {
      if (signal.stop) {
        signal.listener();
      }
    }
  );
}
