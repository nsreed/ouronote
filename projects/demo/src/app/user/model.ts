import { VectorGraph } from './VectorGraph';

/**
 * Allows a set to store metadata about its members, separate from the members (such as the timestamp when the member was added)
 */
export type SetReference<M> = {
  reference: M;
};

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
  favorites: {
    colors: {
      [name: string]: string;
    };
  };
  vectorRefs: SetReference<VectorGraph>[];
  name: string;
  certs: {
    [path: string]: {
      [pub: string]: string;
    };
  };
}
