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
  name: string;
}
