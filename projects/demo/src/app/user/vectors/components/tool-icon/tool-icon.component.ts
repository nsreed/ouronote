import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { VectorTool } from '../../tools/paper-tool';

@Component({
  selector: 'app-tool-icon',
  templateUrl: './tool-icon.component.html',
  styleUrls: ['./tool-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolIconComponent implements OnInit {
  @Input()
  tool!: VectorTool;
  constructor() {}

  ngOnInit() {}
}
