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

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private profService: ProfessionalService,
    private cookieService: CookieService
  ) { }

  RoleEmail(role: string) {
    this.userService.RoleEmailConfirmation(role);
  }
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
      await this.userService.CreateUserData(userdata);
    } else if (userdata.role === 'Professional') {
      await this.profService.CreateProfessionalData(userdata);
    }

    await firebase.default.auth().currentUser?.getIdToken()
      .then(data => {
        this.jwt = data;
      });

    this.cookiesFactory(this.jwt, userdata.uid, userdata.role);

    this.router.navigateByUrl('/main');
  }
  async SigInWithEmailAndPassword(userdata: any) {

    this.RoleEmail(userdata.role);

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

      this.cookiesFactory(this.jwt, this.uid, this.role);

      this.router.navigateByUrl('/main');
    }
  }
  async SignOut() {

    await this.cookieService.delete('JWT');
    await this.cookieService.delete('uid');
    await this.cookieService.delete('role');

    await this.afAuth.signOut();
    await location.reload();
  }
  isAuthenticated() {

    const checkUser = this.cookieService.get('JWT');

    if (checkUser) {
      return true;
    }
    return false;
  }
  cookiesFactory(jwt: string, uid: string, role: string) {
    this.cookieService.set('JWT', jwt);
    this.cookieService.set('uid', uid);
    this.cookieService.set('role', role);
  }
  async getIdToken() {

    return await firebase.default.auth().currentUser?.getIdToken();
  }
}
export async function emailVerification(email: any): Promise<boolean> {

  var result = {};

  const db = firebase.default.firestore();

  const checkEmail = await db.collection("users").where("email", "==", email).get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        result = doc.get('email');
      });
    });

  if (Object.keys(result).length !== 0) {
    return true;
  }

  return false;
}


