import * as paper from 'paper';
const snapshot = (project: paper.Project) => ({
  activeLayer: project.activeLayer,
  currentStyle: project.currentStyle,
});
