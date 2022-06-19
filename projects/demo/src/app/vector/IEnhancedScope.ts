import { UndoStack } from '../user/vectors/tools/undo-stack';
import { VectorTool } from '../user/vectors/tools/paper-tool';

export type IEnhancedScope = paper.PaperScope &
  UndoStack & {
    lastActiveTool: VectorTool;
    tool: VectorTool;
    tools: VectorTool[];
  };
