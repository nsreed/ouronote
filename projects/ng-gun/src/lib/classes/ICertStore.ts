export interface ICertStore {
  [key: string]: {
    [key: string]: string | null | undefined;
  };
}
