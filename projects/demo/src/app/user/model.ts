import { VectorGraph } from './VectorGraph';
import { LayerGraph } from './LayerGraph';

/**
 * Allows a set to store metadata about its members, separate from the members (such as the timestamp when the member was added)
 */
export type SetReference<M, D = any> = {
  reference: M;
  data: D;
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

export interface VectorWorkspaceState {
  isExpanded?: {
    layers?: boolean | null;
    selection?: boolean | null;
    toolProperties?: boolean | null;
  };
  activeTool?: string | null;
  activeLayer?: LayerGraph | null;
  currentStyle?: StyleGraph | null;
}

export interface StyleGraph {
  strokeWidth: number | null | undefined;
  strokeColor: string | null | undefined;
  strokeCap: string | null | undefined;
  strokeJoin: string | null | undefined;
  strokeScaling: boolean | null | undefined;
  dashOffset: number | null | undefined;
  dashArray: string | null | undefined;
  fillColor: string | null | undefined;
  // fillRule: null | null | undefined,
  shadowColor: string | null | undefined;
  shadowBlur: number | null | undefined;
  shadowOffset: string | null | undefined;
  fontFamily: string | null | undefined;
  fontWeight: number | string | null | undefined;
  fontSize: number | string | null | undefined;
  leading: number | null | undefined;
  justification: string | null | undefined;
  miterLimit: number | null | undefined;
}

export interface User {
  inbox: Message[];
  messages: Message[];
  posts: Post[];
  vectors: VectorGraph[];
  vectorRefs: SetReference<VectorGraph, VectorWorkspaceState>[];
  favorites: {
    colors: {
      [name: string]: string;
    };
    styles: {
      [name: string]: StyleGraph;
    };
  };
  name: string;
  certs: {
    [path: string]: {
      [pub: string]: string;
    };
  };
}
