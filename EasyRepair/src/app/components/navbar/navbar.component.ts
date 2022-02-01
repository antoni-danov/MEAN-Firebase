import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: any;
  userUid: string | undefined;
  role: string | undefined;

  constructor(private afAuth: AngularFireAuth,
    private service: AuthService,
    private cookieService: CookieService,
    private router: Router) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((data) => {
      this.userUid = this.cookieService.get('uid');
      this.role = this.cookieService.get('role');
      this.loggedIn = data;
    });
  }
  openNav() {
    document.getElementById("myNav")!.style.width = "100%";
  }
  closeNav() {
    document.getElementById("myNav")!.style.width = "0%";
  }

  logout() {
    this.service.SignOut();
    return this.router.navigateByUrl('');
  }
}
