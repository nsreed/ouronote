import { Component, OnInit } from '@angular/core';
import { ChainDirective } from 'ng-gun';
import { switchMap, shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-invited-users',
  templateUrl: './invited-users.component.html',
  styleUrls: ['./invited-users.component.scss'],
})
export class InvitedUsersComponent implements OnInit {
  layersCerts$ = this.vectorChain.chain$.pipe(
    switchMap((chain) => chain.get('certs').get('layers').open()),
    map((layerUsers: any) =>
      Object.keys(layerUsers).filter((k) => layerUsers[k])
    ),
    shareReplay(1)
  );

  constructor(public readonly vectorChain: ChainDirective) {
    this.layersCerts$.subscribe((certs) => console.log(certs));
  }

  ngOnInit(): void {}
}
