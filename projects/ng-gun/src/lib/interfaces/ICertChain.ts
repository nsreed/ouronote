export interface ICertChain {
  /** Certificate list {path: cert} */
  certs?: string[];
  /** Certificant blacklist - {pubKey: true} means user is blacklisted */
  blacklist?: boolean[];
}
