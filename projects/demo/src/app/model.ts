export type PaperExport<T> = [string, T];

export interface ItemGraph {
  className: string;
  data?: any;
  children?: ItemGraph[];
}

export interface LayerGraph extends ItemGraph {
  applyMatrix: boolean;
  className: 'Layer';
  index: number;
  __children: ItemGraph[];
}

export interface Vector {
  title: string;
  data?: string;
  project?: any;
  graph?: LayerGraph[];
  [key: string]: any;
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
