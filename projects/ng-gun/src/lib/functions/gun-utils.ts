import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunCertificate } from '../classes/Certificate';
export const gunUpdateTime = (value: any) => {
  const updates = Gun.node.is(value) ? (value as any)._['>'] : null;
  if (!updates) {
    return 0;
  }
  return Object.values(updates).reduce((latest: any, time: any) =>
    time > latest ? time : latest
  ) as number;
};
export const gunChainArray = (value: IGunChainReference) => {
  let c = value as any;
  const path = [];
  do {
    if (c._.get) {
      path.push(c);
    } else {
      break;
    }
    c = c.back();
  } while (c.back() !== c);

  while (c.back) {
    const back = c.back();
    if (back !== c && (c as any)._.get) {
      const key = (c as any)._.get;
      path.push(key);
      c = c.back();
    } else {
      break;
    }
  }
  return path;
};

export const gunCertificateChain = (value: IGunChainReference) =>
  gunChainArray(value).map((c) => c.get('certs'));

/**
 * Returns an array of keys representing the path of the given chain
 * @param value the chain to pathify
 */
export const gunPath = (value: IGunChainReference) => {
  let c = value as any;
  const path = [];
  while (c.back) {
    const back = c.back();
    if (back !== c && (c as any)._.get) {
      const key = (c as any)._.get;
      path.push(key);
      c = c.back();
    } else {
      break;
    }
  }
  return path;
};

export function parseCertificate(cert: string) {
  const RE_SEA_CERT = /^SEA/;
  if (!RE_SEA_CERT.test(cert)) {
    throw new Error('could not parse certificate, incorrect prefix');
  }
  const scrubbed = cert.replace(RE_SEA_CERT, '');
  return JSON.parse(scrubbed) as IGunCertificate;
}
export const over = (obj: any) => (fnName: string) => {
  const orig = obj[fnName];
  return (cb: (...args: any[]) => any) => {
    obj[fnName] = (...args: any) => {
      // console.log({ orig });
      if ('function' === typeof orig) {
        orig(...args);
      }
      cb(...args);
    };
    return () => {
      obj[fnName] = orig;
    };
  };
};
export function isSubSoul(a: string, b: string) {
  const sa = a.split('/');
  const ba = b.split('/');
  if (ba.length < sa.length) {
    return false;
  }
  return !ba.find((v, i) => i < sa.length && sa[i] !== v);
}
