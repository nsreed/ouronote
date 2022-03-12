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
}
