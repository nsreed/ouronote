export type PaperExport<T> = [string, T];

export interface Vector {
  title: string;
  data?: string;
  project?: any;
}

export interface Post {
  title: string;
  body: string;
}

export interface Message {
  text: string;
}

export interface User {
  messages: Message[];
  posts: Post[];
  vectors: Vector[];
  name: string;
}
