import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vector-form',
  templateUrl: './vector-form.component.html',
  styleUrls: ['./vector-form.component.scss'],
})
export class VectorFormComponent implements OnInit {
  form = this.fb.group({
    title: [null, Validators.required],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
