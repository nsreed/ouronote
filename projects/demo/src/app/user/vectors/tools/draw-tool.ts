import { VectorTool } from './paper-tool';
export class DrawTool extends VectorTool {
  category = 'draw';
  activate(): void {
    super.activate();
    this.project?.deselectAll();
  }
}
