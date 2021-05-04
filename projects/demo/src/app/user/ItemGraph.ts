export interface ItemGraph {
  className: string;
  data?: any;
  children?: ItemGraph[];
  z?: number;
  [key: string]: any;
}
