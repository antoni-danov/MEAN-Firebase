import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../user/user.service';
import { ProfessionalService } from '../professionals/professional.service';
import { CookieService } from 'ngx-cookie-service';
import { errorMessage } from 'src/app/shared/errorMessageFactory';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isVisible: boolean = false;
  uid: any;
  jwt: any;
  userInfo: any;
  role?: string | void;
  user: any;
  error: any;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService,
    private profService: ProfessionalService,
    private cookieService: CookieService
  ) { }

  async UserSignUpWithEmailAndPassword(userdata: any) {

    const result = await this.afAuth.createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch(error => {
        throw this.error = errorMessage.fireBase(error.code);
      });
    result.user?.updateProfile({
      displayName: `${userdata.firstname} ${userdata.lastname}`
    });
    userdata.uid = result.user?.uid;

    await this.userService.CreateUserData(userdata);

    await firebase.default.auth().currentUser?.getIdToken()
      .then(data => {
        this.jwt = data;
      });

    this.cookiesFactory(this.jwt, userdata.uid, 'User');

    this.router.navigateByUrl('/main');

  }
  async ProfessionalSignUpWithEmailAndPassword(userdata: any) {

    const result = await this.afAuth.createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch(error => {
        throw this.error = errorMessage.fireBase(error.code);
      });
    userdata.uid = result.user?.uid;

    await this.profService.CreateProfessionalData(userdata);

    this.getIdToken();

    this.cookiesFactory(this.jwt, userdata.uid, 'Professional');

    this.router.navigateByUrl('/main');

  }
  async UserSignIn(userdata: any) {
    if (userdata.email && userdata.password) {

      await this.afAuth.signInWithEmailAndPassword(userdata.email, userdata.password)
        .then(data => {
          this.uid = data.user?.uid;
        })
        .catch(error => {
          this.router.navigateByUrl('/user/login');

          throw this.error = errorMessage.fireBase(error.code);
        });

      this.jwt = await this.getIdToken();

      this.cookiesFactory(this.jwt, this.uid, 'User');

      this.router.navigateByUrl('/main');
    }

  }
  async ProfessionalSignIn(userdata: any) {
    if (userdata.email && userdata.password) {
      await this.afAuth.signInWithEmailAndPassword(userdata.email, userdata.password)
        .then(data => {
          this.uid = data.user?.uid;
        })
        .catch(error => {
          this.router.navigateByUrl('/professionals/login');
          throw this.error = errorMessage.fireBase(error.code);
        });

      this.jwt = await this.getIdToken();

      this.cookiesFactory(this.jwt, this.uid, 'Professional');

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
    this.cookieService.getAll();
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


