import { IGunCryptoKeyPair } from 'gun/types/types';
export type ISharedWorkerState = {
  sessions: IGunCryptoKeyPair[];
};
