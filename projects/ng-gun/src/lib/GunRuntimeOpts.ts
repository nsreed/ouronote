import { GunPeers } from './GunPeers';
export type GunRuntimeOpts = {
  peers: GunPeers;
  batch: number;
  chunk: number;
  code: any;
  file: string;
  gap: number;
  indexedDB: IDBFactory;
  jsonify: boolean;
  localStorage: boolean;
  log: () => void;
  mesh: () => void;
  pack: number;
  pid: string;
  puff: number;
  remember: boolean;
  rtc: {
    dataChannel: {
      maxRetransmits: number;
      ordered: boolean;
    };
    iceServers: {
      urls: string;
    }[];
    sdp: {
      mandatory: {
        OfferToReceiveAudio: boolean;
        OfferToReceiveVideo: boolean;
      };
    };
  };
  until: number;
  WebSocket: any;
};
