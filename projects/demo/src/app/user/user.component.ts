import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CertificatesComponent } from '../components/certificates/certificates.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    router: Router,
    route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    console.log('user route', route.routeConfig?.children);
  }

  ngOnInit(): void {
    // this.messages.on().subscribe((msgs) => console.log('messages', msgs));
  }

  openCertificates() {
    this.dialog.open(CertificatesComponent, { height: '90%', width: '90%' });
  }
}
