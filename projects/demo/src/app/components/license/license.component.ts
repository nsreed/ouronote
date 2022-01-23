import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { License } from '../../License';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseComponent implements OnInit {
  @Input()
  license!: License;

  constructor() {}

  ngOnInit(): void {}
}
