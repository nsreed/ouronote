import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import host from '@jsdevtools/host-environment';
import { saveAs } from 'file-saver';
import { ClipboardService } from 'ngx-clipboard';
import { VERSION } from 'projects/demo/src/environments/version';
import { NgGunService } from 'projects/ng-gun/src/lib/ng-gun.service';
import { debounceTime } from 'rxjs/operators';
import stringify from 'safe-stable-stringify';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss'],
})
export class BugReportComponent implements OnInit {
  report: any = null;
  reportStr = '';
  descriptionCtl = this.fb.control(null);

  includeForm = this.fb.group({
    is: this.fb.control(false),
    peers: this.fb.control(false),
    graph: this.fb.control(false),
    gunOpts: this.fb.control(false),
    log: this.fb.control(true),
  });

  get is() {
    return this.includeForm.value.is ? { is: this.ngGun.auth().is?.pub } : {};
  }

  get peers() {
    return this.includeForm.value.peers ? { peers: this.data.peers } : {};
  }

  get graph() {
    return this.includeForm.value.graph ? { graph: this.data.gun._.graph } : {};
  }

  get log() {
    return this.includeForm.value.log ? { log: this.data.messages } : {};
  }

  get gunOpts() {
    return this.includeForm.value.gunOpts
      ? { gunConstructorOptions: this.ngGun.gunOptions }
      : {};
  }

  constructor(
    public ngGun: NgGunService,
    private router: Router,
    private cb: ClipboardService,
    private dialogRef: MatDialogRef<BugReportComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private toaster: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.generate();
    this.descriptionCtl.valueChanges.pipe(debounceTime(200)).subscribe(() => {
      // if (this.descriptionCtl.value?.length > 0) {
      this.report = {
        ...this.report,
        description: this.descriptionCtl.value,
      };
      // }
      this.updatePreview();
    });
    this.includeForm.valueChanges.subscribe(() => this.generate());
  }

  ngOnInit() {}

  generate() {
    const report = {
      host: window.location.host,
      route: this.router.url,
      timestamp: Date.now(),
      version: VERSION,
      system: host.browser,
      ...this.gunOpts,
      ...this.is,
      ...this.log,
      ...this.peers,
      ...this.graph,
    };
    this.report = report;
    this.updatePreview();
  }

  updatePreview() {
    this.reportStr = stringify(this.report, null, 2);
  }

  copy() {
    this.cb.copy(this.reportStr);
    this.toaster.open('copied to clipboard!', 'dismiss', {
      duration: 5000,
    });
  }

  download() {
    const graphBlob = new Blob([this.reportStr], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(graphBlob, `ouronote-bugreport-${Date.now()}.json`);
  }
}
