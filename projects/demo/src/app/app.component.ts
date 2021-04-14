import { Component } from '@angular/core';
import { NgGunService } from '../../../ng-gun/src/lib/ng-gun.service';
import { User } from './user/model';
import {
  Router,
  ActivatedRoute,
  ChildActivationEnd,
  NavigationEnd,
} from '@angular/router';
import { filter, takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any;
  constructor(
    public ngGun: NgGunService<User>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.ngGun.auth();
    // console.log('!! ROUTE SNAPSHOT', route.snapshot);

    let lastActivated: ChildActivationEnd;
    router.events
      .pipe(filter((e) => e instanceof ChildActivationEnd))
      .subscribe((e) => (lastActivated = e as any));
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        // console.log('last activated at navigation end', lastActivated);
      });
    // router.events.subscribe((e) => console.log('router event', e));
  }

  logout() {
    this.ngGun.auth().logout();
    this.router.navigateByUrl('/login');
  }
}
