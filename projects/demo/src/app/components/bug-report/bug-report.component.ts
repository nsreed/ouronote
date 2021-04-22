import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GunPeer, NgGunService } from 'ng-gun';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss'],
})
export class BugReportComponent implements OnInit {
  report: any = null;
  reportStr = '';

  constructor(
    public ngGun: NgGunService,
    private router: Router,
    private cb: ClipboardService,
    private dialogRef: MatDialogRef<BugReportComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private toaster: MatSnackBar
  ) {
    this.generate();
  }

  ngOnInit() {}

  generate() {
    // LogService.buffer$.pipe(take(1)).subscribe((messages) => {
    //   console.table(messages);
    const peers = Object.keys(this.ngGun.peers).map((k) => {
      const rawPeer = this.ngGun.peers[k] as GunPeer;

      const x = {
        ...rawPeer,
        wire:
          rawPeer.wire === undefined
            ? undefined
            : {
                readyState: rawPeer.wire.readyState,
                protocol: rawPeer.wire.protocol,
                extensions: rawPeer.wire.extensions,
                bufferedAmount: rawPeer.wire.bufferedAmount,
              },
      };
      return x;
    });
    const graph = this.data.gun._.graph;
    const gunConstructorOptions = this.ngGun.gunOptions;
    const report = {
      url: this.router.url,
      is: this.ngGun.auth().is?.pub,
      gunConstructorOptions,
      peers,
      graph,
      // log: messages,
    };
    this.report = report;
    this.reportStr = JSON.stringify(this.report, null, 2);
    // });
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
