import * as paper from 'paper';
import { PaperScope } from '../paper-scope.directive';
import { PaperDirective } from '../paper.directive';

export class PaperWidget<T = any> {
  constructor(
    public readonly project: paper.Project,
    public readonly paper: paper.PaperScope
  ) {}

  draw() {}

  protected savedState: any;
  protected saveProjectState() {
    this.savedState = {
      activeLayer: this.project.activeLayer,
      currentStyle: this.project.currentStyle,
    };
  }
  protected restoreProjectState() {
    if (this.savedState) {
      if (this.savedState.activeLayer) {
        this.savedState.activeLayer.activate();
      }
      if (this.savedState.currentStyle) {
        this.project.currentStyle = this.savedState.currentStyle;
      }
    }
  }
}
