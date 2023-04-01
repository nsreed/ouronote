import { Aspect, AspectContext } from 'ts-aspect';
import * as paper from 'paper';
import { saveStyle } from '../../user/vectors/functions/paper-functions';

export interface IPaperState {
  activeLayer?: any;
  restoreStyle?: any;
  autoUpdate?: any;
  insertItems?: any;
}

export interface PaperHaverCtx extends AspectContext {
  target: { paper: paper.PaperScope; project: paper.Project };
  state?: IPaperState;
}

export class PaperStateAspect implements Aspect {
  /**
   * @param tempState The state to apply during the function call
   */
  constructor(private tempState: IPaperState = {}) {}
  execute(ctx: PaperHaverCtx) {
    const { project, paper } = ctx.target;

    // return:
    if (ctx.state) {
      applyPaperState(ctx.state, project, paper);
      return;
    }

    // enter:
    ctx.state = getPaperState(project, paper);
    applyPaperState(this.tempState, project, paper);
  }
}

export function applyPaperState(
  state: IPaperState,
  project: paper.Project,
  paper: paper.PaperScope
) {
  if (state?.activeLayer) {
    state.activeLayer.activate();
  }
  if (state?.restoreStyle) {
    state.restoreStyle();
  }
  if (state?.autoUpdate !== undefined) {
    project.view.autoUpdate = state.autoUpdate;
  }
  if (state?.insertItems !== undefined) {
    paper.settings.insertItems = state.insertItems;
  }
}

export function getPaperState(
  project: paper.Project,
  paper: paper.PaperScope
): IPaperState {
  return {
    activeLayer: project.activeLayer,
    restoreStyle: saveStyle(project),
    autoUpdate: project.view.autoUpdate,
    insertItems: paper.settings.insertItems,
  };
}
