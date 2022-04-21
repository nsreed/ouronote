import { Component, OnInit, Input } from '@angular/core';
import { EditVectorComponent } from '../../edit-vector/edit-vector.component';
import { FormBuilder } from '@angular/forms';
import { ItemPair } from '../../classes/ItemPair';

@Component({
  selector: 'app-selected-items',
  templateUrl: './selected-items.component.html',
  styleUrls: ['./selected-items.component.scss'],
})
export class SelectedItemsComponent implements OnInit {
  @Input()
  selectedItems!: (paper.Item & {
    pair?: ItemPair;
  })[];

  constructor(
    private fb: FormBuilder,
    public editVectorComponent: EditVectorComponent
  ) {}

  ngOnInit(): void {}

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
      items.reverse().forEach((item) => item.bringToFront());
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

    // this.selectedItems?.forEach((item) => {
    //   const top = item.parent?.lastChild;
    //   if (top === item) {
    //     return;
    //   }

    //   let prevGun: any = null;
    //   if (item.nextSibling) {
    //     console.log(`replacing nextSibling's 'above'`);
    //     // Set nextSibling's 'above' to previousSibling
    //     prevGun = (item.previousSibling as any)?.pair?.chain.gun;
    //     if (item.previousSibling) {
    //       item.nextSibling.data.previousSibling = {
    //         '#': item.previousSibling?.data.path,
    //       };
    //     } else {
    //       delete item.nextSibling.data.previousSibling;
    //     }
    //   }

    //   item.pair?.previousSibling.put((top as any).pair?.chain.gun as never);
    //   (item.nextSibling as any)?.pair?.previousSibling.put(prevGun || null);
    // });
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
      items.forEach((item) => item.sendToBack());
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
    // this.selectedItems?.forEach((item) => {
    //   if (item.parent?.firstChild === item) {
    //     return;
    //   }

    //   let prevGun: any = null;
    //   if (item.nextSibling) {
    //     prevGun = (item.previousSibling as any)?.pair?.chain.gun;
    //     if (item.previousSibling) {
    //       item.nextSibling.data.previousSibling = {
    //         '#': item.previousSibling?.data.path,
    //       };
    //     } else {
    //       delete item.nextSibling.data.previousSibling;
    //     }
    //   }

    //   (item.parent?.firstChild as any).pair?.previousSibling.put(
    //     (item.pair as any)?.chain.gun as never
    //   );
    //   item.pair?.previousSibling.put(null as never);
    //   (item.nextSibling as any)?.pair?.previousSibling.put(prevGun || null);
    // });
  }
}
