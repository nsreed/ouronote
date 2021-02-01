export interface Message {
  text: string;
}

export interface User {
  messages: Message[];
  name: string;
}
