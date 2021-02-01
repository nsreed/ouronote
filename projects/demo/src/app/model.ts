export interface Vector {
  title: string;
  data?: string;
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
