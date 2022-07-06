import { VectorTool } from './paper-tool';
export class DrawTool extends VectorTool {
  activate(): void {
    super.activate();
    this.project?.deselectAll();
  }
}
