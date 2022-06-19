export type IEnhancedItem<T> = T & {
  pair?: {
    save: (properties?: string[]) => void;
  };
};
