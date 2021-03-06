import { VectorGraph } from './VectorGraph';

export type PaperExport<T> = [string, T];

export interface Post {
  title: string;
  body: string;
}

export interface Message {
  text: string;
  to: string;
  from?: string;
  read?: boolean;
}

export interface User {
  inbox: Message[];
  messages: Message[];
  posts: Post[];
  vectors: VectorGraph[];
  name: string;
  certs: {
    [path: string]: {
      [pub: string]: string;
    };
  };
}
