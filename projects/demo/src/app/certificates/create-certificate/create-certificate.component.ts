import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.scss'],
})
export class CreateCertificateComponent implements OnInit {
  form = this.fb.group({
    paths: this.fb.array(['comments']),
    public: true,
    people: this.fb.array([]),
    protected: true,
    options: this.fb.group({
      blacklist: 'blacklist',
      expires: null,
    }),
  });

  pathCtl = this.fb.control(null);
  constructor(private fb: FormBuilder) {
    console.log(this.form.value);
    this.form.statusChanges.subscribe((sc) => console.log('status', sc));
  }

  ngOnInit(): void {}

  addPath(path: any) {
    const n = this.form.controls.paths.value;
    n.push(path);
    this.pathCtl.patchValue(null);
  }
  removePath(path: any) {
    const n = this.form.controls.paths.value.filter((p: string) => p !== path);
    const p = this.form.controls.paths.value as string[];
    const idx = p.indexOf(path);
    if (idx >= 0) {
      p.splice(idx, 1);
    }
  }

  addUser() {}

  removeUser(user: any) {}
}
