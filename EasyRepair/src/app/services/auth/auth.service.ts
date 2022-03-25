import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { UserService } from '../user/user.service';
import { ProfessionalService } from '../professionals/professional.service';
import { CookieService } from 'ngx-cookie-service';
import { errorMessage } from 'src/app/shared/errorMessageFactory';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isVisible: boolean = false;
  uid!: string;
  jwt!: string;
  userInfo: any;
  role!: string;
  user: any;
  error!: string;
  match: any;
  currentDate!: Date;
  email!: string;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private profService: ProfessionalService,
    private cookieService: CookieService
  ) { }

  async SignUpWithEmailAndPassword(userdata: any) {
    const result = await this.afAuth.createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch(error => {
        throw this.error = errorMessage.fireBase(error.code);
      });

    result.user?.updateProfile({
      displayName: `${userdata.firstname} ${userdata.lastname}`
    });
    userdata.uid = result.user?.uid;

    if (userdata.role === 'User') {
      this.userService.CreateUserData(userdata);
    } else if (userdata.role === 'Professional') {
      this.profService.CreateProfessionalData(userdata);
    }

    await firebase.default.auth().currentUser?.getIdToken()
      .then(data => {
        this.jwt = data;
      });

    this.cookiesFactory(this.jwt, userdata.uid, userdata.role, userdata.email);

    this.router.navigateByUrl('/main');
  }
  async SignInWithEmailAndPassword(userdata: any) {

    const currentEmail = userdata.email.toLowerCase();

    await this.RoleEmailVerification(userdata.role, currentEmail);

    if (userdata.email && userdata.password) {

      await this.afAuth.signInWithEmailAndPassword(userdata.email, userdata.password)
        .then(data => {
          this.uid = data.user?.uid!;
        })
        .catch(error => {
          this.router.navigateByUrl('/login');

          throw this.error = errorMessage.fireBase(error.code);
        });


      const currentJwt = await this.getIdToken();
      this.jwt = currentJwt!;
      this.role = userdata.role;
      this.email = currentEmail;

      this.cookiesFactory(this.jwt, this.uid, this.role, this.email);

      this.router.navigateByUrl('/main');
    }

  }
  async SignOut() {

    await this.cookieService.delete('JWT');
    await this.cookieService.delete('uid');
    await this.cookieService.delete('role');
    await this.cookieService.delete('email');

    await this.afAuth.signOut();
    await location.reload();
  }
  async RoleEmailVerification(role: string, email: string) {

    if (role === 'User') {
      return await this.userService.RoleEmailMatch(role, email).then(data => {

        this.match = data;
        if (data !== true) {
          throw this.error = "Wrong Profile or Email";
        }
      });
    } else if (role === 'Professional') {
      return await this.profService.RoleEmailMatch(role, email).then(data => {

        this.match = data;

        if (data !== true) {
          throw this.error = "Wrong Profile or Email";
        }
      });
    }
  }
  isAuthenticated() {

    const checkUser = this.cookieService.get('JWT');

    if (checkUser) {
      return true;
    }
    return false;
  }
  cookiesFactory(jwt: string, uid: string, role: string, email: string) {

    this.currentDate = new Date();
    this.currentDate.setHours(this.currentDate.getHours() + 12);

    this.cookieService.set('JWT', jwt, { expires: this.currentDate, secure: true });
    this.cookieService.set('uid', uid, { expires: this.currentDate, secure: true });
    this.cookieService.set('role', role, { expires: this.currentDate, secure: true });
    this.cookieService.set('email', email, { expires: this.currentDate, secure: true });
  }
  async getIdToken() {

    return await firebase.default.auth().currentUser?.getIdToken();
  }
}


