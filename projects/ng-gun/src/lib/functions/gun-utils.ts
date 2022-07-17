import * as Gun from 'gun';
import { IGunChainReference } from 'gun/types/chain';
import { IGunCertificate } from '../classes/Certificate';

export type GunMetadata<T extends any = any> = T & {
  _: {
    '>': {
      [propertyName in keyof T]: number;
    };
  };
};

/** Gets the most recent update time for this node */
export const gunUpdateTime = (value: GunMetadata) => {
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

/** Determines if b is a sub-soul (deeper in the same path) of a */
export function isSubSoul(a: string, b: string) {
  const sa = a.split('/');
  const ba = b.split('/');
  if (ba.length < sa.length) {
    return false;
  }
  return !ba.find((v, i) => i < sa.length && sa[i] !== v);
}

function gunUpdates(doc: GunMetadata) {
  return (doc._ && doc._['>']) || {};
}

/**
 * Gets an array all unique keys for provided objects
 * @param objects the objects whose keys should be merged
 * @returns an array containing all unique keys for all provided objects
 */
function mergeKeys(...objects: any[]) {
  return [
    ...new Set(
      objects.reduce((p: string[], c: any) => p.concat(Object.keys(c)), [])
    ),
  ];
}

export function gunDiff(docA: GunMetadata, docB: GunMetadata) {
  const aup = gunUpdates(docA);
  const bup = gunUpdates(docB);

  const allKeys = mergeKeys(aup, bup);
  const out = allKeys.reduce((acc, k) => {
    const src = aup[k] >= bup[k] ? docA : docB;
    acc[k] = src[k] || docA[k] || docB[k];
    if (acc[k] !== undefined) {
      return acc;
    }
    if (docA[k] === undefined) {
      acc[k] = docB[k];
    }
    if (docB[k] === undefined) {
      acc[k] = docB[k];
    }
    return acc;
  }, {} as any);
  return out;
}
