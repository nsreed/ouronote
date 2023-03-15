import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as paper from 'paper';
import { IEnhancedItem } from 'projects/demo/src/app/vector/IEnhancedItem';
import { Observable } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';
import { PaperEditDirective } from '../../../../vector/paper-edit.directive';
import { unpack } from '../../functions/packaging';
import { RouteVectorDirective } from '../../route-vector.directive';

@Component({
  selector: 'app-vector-loader',
  templateUrl: './vector-loader.component.html',
  styleUrls: ['./vector-loader.component.scss'],
})
export class VectorLoaderComponent
  extends RouteVectorDirective
  implements AfterViewInit
{
  @ViewChild(PaperEditDirective)
  paperDirective!: PaperEditDirective;
  loadEvent$ = this.vectorNode$.pipe(
    switchMap((v: any) => v.get('layers').openChanges() as Observable<any>),
    shareReplay(1)
  );
  create$ = this.loadEvent$.pipe(filter((e: any) => e[0] === 'create'));
  diff$ = this.loadEvent$.pipe(filter((e: any) => e[0] === 'diff'));
  bulk$ = this.loadEvent$.pipe(filter((e: any) => e[0] === 'bulk'));

  ngAfterViewInit(): void {
    console.log('thing', this.vectorNode);
    this.vectorNode$.subscribe((vectorNode) => {
      const project = this.paperDirective.project;
      project.activate();
      (project as any).on('change', (e: any) => {
        console.log(`${e.soul}.${e.propertyName}: ${JSON.stringify(e.value)}`);
      });

      this.create$.subscribe(([name, { data, key, soul }]) => {
        const j = JSON.stringify(unpack(data));
        project.activate();
        const existing = project.getItem({ data: { soul } });
        if (existing) {
          return;
        }
        if (!project.activeLayer) {
          const def = new paper.Layer();
          project.addLayer(def);
          def.activate();
        }
        const item = project.importJSON(j) as IEnhancedItem<paper.Item>;
        item.pair = {
          save: () => console.log('should save'),
        };
        project.activeLayer.insertChild(0, item);
        // console.log('unpacked', item.data, item.isInserted(), item.parent);
        this.paperDirective.scope.tools
          .find((t: any) => t.name === 'move')
          ?.activate();
      });

      this.bulk$.subscribe(([name, { data, key, soul }]) => {
        const j = unpack(data);
        console.log('bulk', soul, key, { layers: j });
      });

      this.diff$.subscribe((...args: any[]) => {
        console.log('diff', ...args);
      });
    });
  }
}
