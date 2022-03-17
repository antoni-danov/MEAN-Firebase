import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentChecked {

  loggedIn!: boolean;
  userUid: string | undefined;
  role: string | undefined;

  constructor(
    private service: AuthService,
    private cookieService: CookieService,
    private router: Router) {
  }

  ngOnInit() {

    this.userUid = this.cookieService.get('uid');
    this.role = this.cookieService.get('role');
    this.loggedIn = this.service.isAuthenticated();
  }
  ngAfterContentChecked() {
    this.ngOnInit();
  }

  openNav() {
    document.getElementById("myNav")!.style.width = "100%";
  }
  closeNav() {
    document.getElementById("myNav")!.style.width = "0%";
  }

  logout() {
    this.service.SignOut();
    return this.router.navigateByUrl('/');
  }
}
