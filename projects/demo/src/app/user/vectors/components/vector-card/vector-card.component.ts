import { Component, OnInit } from '@angular/core';
import { ChainDirective } from '../../../../../../../ng-gun/src/lib/chain.directive';
import { NgGunService } from '../../../../../../../ng-gun/src/lib/ng-gun.service';
import { UserService } from '../../../user.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { VectorGraph } from '../../../VectorGraph';
import { MatDialog } from '@angular/material/dialog';
import { VectorService } from '../../vector.service';
import {
  GunAuthChain,
  GunChain,
} from '../../../../../../../ng-gun/src/lib/classes/GunChain';
import { ConfirmComponent } from 'projects/demo/src/app/components/confirm/confirm.component';
import { VectorExportDialogComponent } from '../vector-export-dialog/vector-export-dialog.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-vector-card',
  templateUrl: './vector-card.component.html',
  styleUrls: ['./vector-card.component.scss'],
})
export class VectorCardComponent implements OnInit {
  vector$ = this.gunChain.chain$.pipe(
    map((c) => this.vectorService.vectors.get((c as any)._['#']))
  );
  private vectorChain!: GunChain;
  vectorNode$ = new ReplaySubject<GunChain>(1);
  canEditTitle$ = this.vector$.pipe(
    switchMap((v) =>
      v
        .get('certs' as never)
        .get('title')
        .get(this.userService.user.is.pub.replace('~', ''))
        .on()
    ),
    map((lc) => {
      return lc !== null && lc !== undefined;
    })
  );

  editing = false;

  private _vector!: VectorGraph;
  public get vector(): VectorGraph {
    return this._vector;
  }
  public set vector(value: VectorGraph) {
    this._vector = value;
    this.titleCtl.patchValue(value.title);
  }

  titleCtl = this.fb.control(null, Validators.required);

  constructor(
    public gunChain: ChainDirective,
    private ngGun: NgGunService,
    private userService: UserService,
    private dialog: MatDialog,
    private vectorService: VectorService,
    private fb: FormBuilder
  ) {
    this.vector$.subscribe((vector) => (this.vectorChain = vector as any));
  }

  ngOnInit(): void {
    this.vectorChain.on().subscribe((v) => (this.vector = v as any));
  }

  download() {
    this.dialog.open(VectorExportDialogComponent, {
      data: {
        vector: this.vector,
      },
    });
  }

  remove() {
    this.dialog
      .open(ConfirmComponent)
      .afterClosed()
      .pipe(filter((r) => r))
      .subscribe((result) => {
        this.vectorService.vectors.unset(this.vector);
      });
  }

  cancelEdit() {
    this.editing = false;
    this.titleCtl.patchValue(this.vector.title);
  }

  confirmEdit() {
    if (this.titleCtl.valid) {
      const titleNode = this.vectorChain.get('title');
      titleNode.userCertificate$.subscribe((c) => {
        titleNode.put(this.titleCtl.value as never, c);
      });
      this.editing = false;
    }
  }

  onTitleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.confirmEdit();
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }
}
