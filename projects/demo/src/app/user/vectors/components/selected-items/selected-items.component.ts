import { Component, OnInit, Input } from '@angular/core';
import { EditVectorComponent } from '../../edit-vector/edit-vector.component';
import { FormBuilder } from '@angular/forms';
import { ItemPair } from '../../classes/ItemPair';
import * as paper from 'paper';
import { LogService } from '../../../../../../../log/src/lib/log.service';
import {
  copyStyleToItem,
  layoutVertical,
} from '../../functions/paper-functions';

function copyMatchingKeys(o1: any, o2: any) {
  const o = {} as any;
  Object.keys(o1).forEach((k) => {
    if (JSON.stringify(o1[k]) === JSON.stringify(o2[k])) {
      // o[k] = JSON.parse(JSON.stringify(o1[k])); // Copy value
      o[k] = o1[k]; // Copy reference (maybe broken)
    } else {
      // console.log('non matching key', k);
      o[k] = null;
    }
  });
  return o;
}

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss'],
})
export class SelectedItemsComponent implements OnInit {
  private _selectedItems!: (paper.Item & {
    pair?: ItemPair;
  })[];
  public get selectedItems(): (paper.Item & {
    pair?: ItemPair;
  })[] {
    return this._selectedItems || [];
  }
  @Input()
  public set selectedItems(
    value: (paper.Item & {
      pair?: ItemPair;
    })[]
  ) {
    let newSelections = [];
    let deSelections = [];
    if (value) {
      newSelections = value.filter((s) => !this.selectedItems.includes(s));
      deSelections = this.selectedItems.filter((s) => !value.includes(s));
    }
    if (newSelections.length > 0 || deSelections.length > 0) {
      this._selectedItems = value;
      this.updateStyleFromSelected();
    }
  }

  styleForm = this.fb.group({
    strokeWidth: null,
  });

  selectedStyle?: paper.Style;

  constructor(
    private fb: FormBuilder,
    public editVectorComponent: EditVectorComponent,
    private logger: LogService
  ) {
    logger.name = 'selected-items';
  }

  ngOnInit(): void {}

  updateStyleFromSelected() {
    const selected = this.editVectorComponent.project.selectedItems;
    // reduce styles of selected items such that:
    // style properties that differ among selected items are null
    // style properties that are the same persist

    if (selected.length > 0) {
      const firstStyle: any = ({ ...selected[0].style } as any)._values; // this is a way to get a clean copy of the style
      // console.log('first style', JSON.stringify(firstStyle));
      const computedStyle = selected.reduce((p, c) => {
        const currentStyle = ({ ...c.style } as any)._values;
        return copyMatchingKeys(p, currentStyle);
      }, firstStyle);
      console.log('computed', computedStyle);
      this.styleForm.patchValue(computedStyle);
      this.selectedStyle = new paper.Style(computedStyle);
    }
  }

  onStyleChange(style: paper.Style | any) {
    // const simple = style.toJSON();
    // this.selectedItems.forEach((s: any) => {
    //   Object.keys(simple._values).forEach((p) => {
    //     const old = s[p];
    //     const nv = simple._values[p];
    //     if (old === undefined) {
    //       // console.log(`old ${p} is undefined`);
    //       return;
    //     }
    //     if (old === nv) {
    //       // console.log(`old ${p} is equal to new value`, nv);
    //       return;
    //     }
    //     // TODO handle text-only stuff better
    //     if (p === 'leading') {
    //       return;
    //     }
    //     if (old === JSON.stringify(nv)) {
    //       console.log(p, 'skipping because JSON equiv');
    //       return;
    //     }
    //     console.log(p, 'old', old, 'new', nv);
    //     s[p] = nv;
    //     s.pair.save([p]);
    //   });
    // });
  }

  onStylePropChange(change: [string, any]) {
    this.logger.log('style prop change', change[0], change[1]);
    const [prop, val] = change;
    this.selectedItems.forEach((s: any) => {
      s[prop] = val;
      s.pair.save([prop]);
    });
  }

  onCloneClick() {
    const items = [...this.selectedItems];
    this.editVectorComponent.project.deselectAll();

    const randomDistance =
      25 * (1 / this.editVectorComponent.project.view.zoom);

    const randomDirection = new paper.Point(randomDistance, 0);
    randomDirection.angle = 30;

    const parents = items.reduce((acc, item) => {
      acc.set(item, item.parent as any);
      return acc;
    }, new Map<any, paper.Item & { pair: ItemPair }>());

    const clones = items.map((item) => {
      const clone = item.clone({
        insert: false,
      });
      // clone.fillColor = item.fillColor || item.style.fillColor;
      // clone.strokeColor = item.strokeColor || item.style.strokeColor;
      // clone.strokeWidth = item.strokeWidth || item.style.strokeWidth;
      clone.data = {};
      clone.translate(randomDirection);
      // copyStyleToItem(item.style, clone);
      // copyStyleToItem(item, clone);
      item.parent.addChild(clone);
      clone.selected = true;
      clone.pair?.doSave();

      return clone;
    });
    this.editVectorComponent.tools.find((t) => t.name === 'move')?.activate();
  }

  onForceSaveClick() {
    this.selectedItems?.forEach((s) => s.pair?.doSave());
  }

  onBringToFrontClick() {
    // Group items by parent
    const parents = this.selectedItems?.reduce(
      (p, c) => {
        if (!Object.keys(p).includes(`${c.parent.id}`)) {
          p[`${c.parent.id}`] = [];
        }
        p[`${c.parent.id}`].push(c);
        return p;
      },
      {} as {
        [key: string]: (paper.Item & {
          pair?: ItemPair;
        })[];
      }
    );

    // For each parent:

    // tslint:disable-next-line: forin
    for (const parentID in parents) {
      const items = parents[parentID];
      // Move selected items to front
      items.forEach((item) => item.bringToFront());
      // Find differences
      const parent = this.editVectorComponent.project.getItem({
        id: parseInt(parentID, 10),
      });

      const changed = parent.children.filter((c) => {
        const oldPrev = c.data.previousSibling?._
          ? c.data.previousSibling._['#']
          : null;
        const newPrev = c.previousSibling?.data.path;
        return oldPrev !== newPrev;
      }) as (paper.Item & {
        pair?: ItemPair;
      })[];

      changed.forEach((item) => {
        const newPrev = item.previousSibling?.data.path;
        item.pair?.previousSibling.put(
          newPrev
            ? ({
                '#': newPrev,
              } as never)
            : (null as never)
        );
      });
    }
  }

  onSendToBackClick() {
    // Group items by parent
    const parents = this.selectedItems?.reduce(
      (p, c) => {
        if (!Object.keys(p).includes(`${c.parent.id}`)) {
          p[`${c.parent.id}`] = [];
        }
        p[`${c.parent.id}`].push(c);
        return p;
      },
      {} as {
        [key: string]: (paper.Item & {
          pair?: ItemPair;
        })[];
      }
    );

    // For each parent:

    // tslint:disable-next-line: forin
    for (const parentID in parents) {
      const items = parents[parentID];
      // Move selected items to front
      items.reverse().forEach((item) => item.sendToBack());
      // Find differences
      const parent = this.editVectorComponent.project.getItem({
        id: parseInt(parentID, 10),
      });

      const changed = parent.children.filter((c) => {
        const oldPrev = c.data.previousSibling?._
          ? c.data.previousSibling._['#']
          : null;
        const newPrev = c.previousSibling?.data.path;
        return oldPrev !== newPrev;
      }) as (paper.Item & {
        pair?: ItemPair;
      })[];

      changed.forEach((item) => {
        const newPrev = item.previousSibling?.data.path;
        item.pair?.previousSibling.put(
          newPrev
            ? ({
                '#': newPrev,
              } as never)
            : (null as never)
        );
      });
    }
  }

  onLayoutVerticalClick() {
    layoutVertical(this.selectedItems as any);
    this.selectedItems.forEach((i) => i.pair?.save(['position']));
  }

  onDebugSelectedClick() {
    this.logger.log('selected', this.selectedItems);
  }
}
