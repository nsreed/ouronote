import { VirtualScrollStrategy } from '@angular/cdk/scrolling';

export interface Action {
  undoFn: () => void;
}

export interface UndoStack {
  actions: Action[];
}
