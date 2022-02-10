import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { UpdateUser } from 'src/app/models/User/UpdateUser';
import { User } from 'src/app/models/User/User';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  role: string | undefined;
  user: any;
  match: any;


  constructor(
    private router: Router,
    private cookies: CookieService,
    private http: HttpClient,
  ) { }

  async RoleEmailMatch(role: string, email: string) {
    return await this.http.get(`${environment.userLocalhost}/find/${email}/${role}`).toPromise();
  }
  async CreateUserData(userdata: User) {

    return await this.http.post<User>(`${environment.userLocalhost}/create`, userdata).subscribe(data => {
      this.user = data;
    });
  }
  async UpdateUserProfile(userdata: any, uid: string | null) {

    try {
      if (userdata) {
        const user: UpdateUser = {
          phonenumber: userdata.phonenumber,
          address: {
            strNumber: userdata.strNumber,
            addressLine: userdata.addressLine,
            city: userdata.city,
            zipCode: userdata.zipCode
          }
        };
        this.router.navigateByUrl(`/user/profile/${uid}`);
        return await this.http.put<User>(`${environment.userLocalhost}/edit/${uid}`, user).toPromise();

      }
    } catch (error) {
      return console.log(error);
    }
  }
  async GetUserById(uid: string) {
    return await this.http.get(`${environment.userLocalhost}/profile/${uid}`).toPromise();
  }
  async DeleteUserProfile() {
    await firebase.default.auth().currentUser?.delete();
    this.cookies.deleteAll();
  }
  async DeleteUserData(uid: string) {
    return this.http.delete(`${environment.userLocalhost}/delete/${uid}`).toPromise();
  }
}
