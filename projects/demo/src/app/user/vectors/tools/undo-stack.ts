export interface Action {
  undoFn: () => void;
}

export interface UndoStack {
  actions: Action[];
}
