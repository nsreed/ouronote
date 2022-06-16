export type IGunMesh = {
  say: (msg: any, peer?: string) => void;
  bye: (id: string) => void;
  hi: (peer: any) => void;
};
