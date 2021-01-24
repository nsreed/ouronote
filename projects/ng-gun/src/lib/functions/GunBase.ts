import { IGunChainReference } from 'gun/types/chain';
import { ArrayOf } from 'gun/types/types';

export type GunBase = Record<string, any>;
export type GunKey<B extends GunBase = GunBase> =
  | string
  | number
  | symbol
  | keyof B;
export type GunValue<B extends GunBase, K extends GunKey<B>> = K extends keyof B
  ? B[K]
  : B;
export type GunContext<
  B extends GunBase = any,
  K extends GunKey<B> = any
> = K extends keyof B ? IGunChainReference<B, K> : IGunChainReference<B>;
