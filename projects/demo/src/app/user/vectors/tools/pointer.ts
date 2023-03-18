import { VectorTool } from './paper-tool';
import {
  map,
  mapTo,
  shareReplay,
  mergeWith,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { ReplaySubject, from, timer } from 'rxjs';
import e from 'express';
import { timeout } from 'rxjs/operators';

type Action = {};

export class PointerTool extends VectorTool {
  name = 'pointer';
  icon = 'cursor';
  category = 'select';
  propertyNames = ['selectLayerConstraint'];

  hasSelections$ = this.selectedItems$.pipe(map((s) => s.length > 0));
  dragging$ = from([
    this.drag.pipe(map(() => true)),
    this.up.pipe(map(() => false)),
  ]).pipe(shareReplay());

  subs = [
    this.click.subscribe(() => console.log('click')),
    this.drag.subscribe(console.log),
    this.heldTime.subscribe((t) => console.log('HELD TO 5 OR WHATEVRER', t)),
  ];
}

// type Action = {
//   readonly type: string;
// };

// export enum SelectionActionType {
//   SELECT_ITEMS = 'Select Items',
//   DESELECT_ITEMS = 'Deselect Items',
//   MOVE_SELECTED = 'Move Selected',
//   SCALE_SELECTED = 'Scale Selected',
//   ROTATE_SELECTED = 'Rotate Selected',
// }
// class DownTrigger {
//   constructor(public payload: any) {}
// }
// class DragTrigger {
//   constructor(public payload: paper.Item[]) {}
// }
// class ClickTrigger {
//   constructor(public payload: paper.Item[]) {}
// }
// class DropTrigger {
//   constructor(payload: paper.Item[]) {}
// }
// export class DeselectAction extends ClickTrigger implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class MoveAction extends DragTrigger implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class ScaleAction extends DragTrigger implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class RotateAction implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class DeselectItemsAction implements Action {
//   public readonly type = SelectionActionType.DESELECT_ITEMS;
// }
// export class SelectItemsAction extends DragTrigger implements Action {
//   public readonly type = SelectionActionType.SELECT_ITEMS;
// }
