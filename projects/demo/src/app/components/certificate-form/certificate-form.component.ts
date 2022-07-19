import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['./certificate-form.component.scss'],
})
export class CertificateFormComponent implements OnInit {
  form = this.fb.group({
    multi: false,
    people: this.fb.array([]),
    policies: this.fb.array([]),
    expires: [null, Validators.min(new Date().getTime())],
  });
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {}
}
