import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObjectPropertyDirective } from 'projects/demo/src/app/directives/object-property.directive';
import { ObjectDirective } from '../../../../directives/object.directive';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss'],
})
export class TextFormComponent implements OnInit, AfterViewInit {
  textCtl = this.fb.control(null);

  @ViewChild('TextArea')
  textAreaRef!: ElementRef<HTMLTextAreaElement>;

  constructor(
    private fb: FormBuilder,
    public prop: ObjectPropertyDirective,
    public obj: ObjectDirective
  ) {
    this.textCtl.valueChanges.subscribe((v) => (prop.value = v));
    obj.object$.subscribe((o) => {
      this.textCtl.patchValue(prop.value, {
        onlySelf: true,
        emitEvent: false,
      });
      this.textAreaRef?.nativeElement?.focus();
    });
  }

  ngOnInit(): void {
    this.textCtl.patchValue(this.prop.value);
  }

  ngAfterViewInit(): void {
    this.textAreaRef.nativeElement.focus();
  }
}
