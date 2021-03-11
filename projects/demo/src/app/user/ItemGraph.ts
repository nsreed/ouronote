export interface ItemGraph {
  className: string;
  data?: any;
  children?: ItemGraph[];
  [key: string]: any;
}
