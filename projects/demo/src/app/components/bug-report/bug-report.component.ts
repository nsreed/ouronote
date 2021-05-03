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

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss'],
})
export class BugReportComponent implements OnInit {
  report: any = null;
  reportStr = '';
  descriptionCtl = this.fb.control(null);

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
  }

  ngOnInit() {}

  generate() {
    // LogService.buffer$.pipe(take(1)).subscribe((messages) => {
    //   console.table(messages);
    const graph = this.data.gun._.graph;
    const gunConstructorOptions = this.ngGun.gunOptions;
    const report = {
      host: window.location.host,
      route: this.router.url,
      is: this.ngGun.auth().is?.pub,
      gunConstructorOptions,
      peers: this.data.peers,
      graph,
      timestamp: Date.now(),
      version: VERSION,
      system: host.browser,
      // log: this.data.messages,
      // log: messages,
    };
    this.report = report;
    // });
    this.updatePreview();
  }

  updatePreview() {
    // FIXME crashing with circular references in messages
    this.reportStr = JSON.stringify(this.report, null, 2);
  }

  copy() {
    this.cb.copy(this.reportStr);
    this.toaster.open('copied to clipboard!');
  }

  download() {
    const reportStr = JSON.stringify(this.report, null, 2);
    const graphBlob = new Blob([reportStr], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(graphBlob, `ouronote-bugreport-${Date.now()}.json`);
  }
}
