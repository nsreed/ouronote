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
    this.selectedItems?.forEach((item) => {
      const top = item.parent?.lastChild;
      if (top === item) {
        return;
      }

      let prevGun: any = null;
      if (item.nextSibling) {
        console.log(`replacing nextSibling's 'above'`);
        // Set nextSibling's 'above' to previousSibling
        prevGun = (item.previousSibling as any)?.pair?.chain.gun;
        if (item.previousSibling) {
          item.nextSibling.data.previousSibling = {
            '#': item.previousSibling?.data.path,
          };
        } else {
          delete item.nextSibling.data.previousSibling;
        }
      }

      item.pair?.previousSibling.put((top as any).pair?.chain.gun as never);
      (item.nextSibling as any)?.pair?.previousSibling.put(prevGun || null);
    });
  }

  onSendToBackClick() {
    this.selectedItems?.forEach((item) => {
      if (item.parent?.firstChild === item) {
        return;
      }

      let prevGun: any = null;
      if (item.nextSibling) {
        console.log(`replacing nextSibling's 'above'`);
        // FIXME moving multiple items is broken
        // a, b, s1, s2, c
        // move s1 to back
        // s2 gets prev set to b...
        // ...
        // basically, the selected items should end up in a contiguous group at beginning or end
        // but since we're doing this reactively, and using the document state to make these changes,
        // things might end up stale
        // s1, a, b, s2, c
        // but the document is still a, b, s1, s2, c
        // so when s2 moves, c gets prev set to s1, effectively moving it to the top with s1
        // so what do we do???

        /* Idea 1
          group selectedItems by parent
          for each group:
          set each item's previousSibling to its previous selected item (maintains relative order)
          set first selected item's previousSibling to null...
          repair adjacent non-selected items
          like, getClosestUnselectedPrev(selectedItem) & getClosestUnselectedNext(selectedItem)
          ^ could get expensive if we're moving large selections
        */

        /* Idea 2
          just have the parent rewrite the child order?
        */

        // FIXME drawing after reordering multiple items causes glitchiness

        prevGun = (item.previousSibling as any)?.pair?.chain.gun;
        if (item.previousSibling) {
          item.nextSibling.data.previousSibling = {
            '#': item.previousSibling?.data.path,
          };
        } else {
          delete item.nextSibling.data.previousSibling;
        }
      }

      (item.parent?.firstChild as any).pair?.previousSibling.put(
        (item.pair as any)?.chain.gun as never
      );
      item.pair?.previousSibling.put(null as never);
      (item.nextSibling as any)?.pair?.previousSibling.put(prevGun || null);
    });
  }
}
