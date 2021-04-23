import { VectorGraph } from './VectorGraph';

export type PaperExport<T> = [string, T];

export interface Post {
  title: string;
  body: string;
}

export interface Message {
  text: string;
  to: string;
}

export interface User {
  inbox: Message[];
  messages: Message[];
  posts: Post[];
  vectors: VectorGraph[];
  name: string;
}
