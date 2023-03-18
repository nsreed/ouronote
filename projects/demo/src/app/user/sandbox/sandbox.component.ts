import { Component, OnInit } from '@angular/core';
import { range, ReplaySubject, timer, from, interval, of } from 'rxjs';
import * as paper from 'paper';
import { map, shareReplay, timeInterval } from 'rxjs/operators';
import { time } from 'console';

const second$ = interval(1000);
function p(x: number, y = 0) {
  return new paper.Point(x, y);
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  constructor() {}
  frame$ = timer(0, 1000 / 60);

  //.subscribe((f) => console.log(`frame ${f}`));
  project!: paper.Project;
  get style() {
    return this.project.currentStyle;
  }

  ngOnInit() {}
  onProjectChange(proj: paper.Project) {
    this.project = proj;
    proj.addLayer(new paper.Layer());
    proj.currentStyle.strokeColor = new paper.Color('black');
    proj.currentStyle.fillColor = null; // new paper.Color('#99aa99');
    proj.currentStyle.strokeWidth = 1;

    this.drawCircles();

    // centers the group
    this.project.view.translate(
      p(0, 0).subtract(this.project.view.center).multiply(-1)
    );
  }

  drawCircles() {
    const g = new paper.Group();

    const c = new paper.Path.Circle(p(0, 0), 400);

    const blades = 100;
    const divisions = 1;
    range(0, blades).subscribe((a) => {
      const angle = (360 / blades) * a;
      // a = 360 / 30;
      const r = p(400, 0).rotate(angle, p(0, 0));
      const l = new paper.Path.Line(p(0, 0), r);
      l.parent = c;
      g.addChild(l);
    });

    this.project.view.onMouseMove = (e: paper.MouseEvent) => {
      const point = this.project.view.viewToProject(e.point);
      // new paper.Path.Line(point, p(0, 0));
    };
  }
}
