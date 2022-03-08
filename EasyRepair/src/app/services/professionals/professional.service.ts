import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Professional } from 'src/app/models/Professional/Professional';
import { ProfessionalInfo as GetProfesional } from 'src/app/models/Professional/GetProfessional';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  role: string | undefined;
  user: any;

  constructor(
    private router: Router,
    private cookies: CookieService,
    private http: HttpClient,
  ) { }

  async RoleEmailMatch(role: string, email: string) {
    return await this.http.get(`${environment.professionalLocalhost}/find/${email}/${role}`).toPromise();
  }
  async CreateProfessionalData(userdata: Professional) {

    return await this.http.post<Professional>(`${environment.professionalLocalhost}/create`, userdata)
      .subscribe(data => {
        this.user = data;
      });
  }
  async GetAllProfessionals() {
    return await this.http.get<GetProfesional>(`${environment.professionalLocalhost}/all`).toPromise();
  }
  async GetByProfession(userdata: string) {
    return await this.http.get<Professional>(`${environment.professionalLocalhost}/profession/${userdata}`).toPromise();
  }
  async GetProfessionalById(uid: string) {
    return await this.http.get<Professional>(`${environment.professionalLocalhost}/profile/${uid}`).toPromise();
  }
  async PublicProfessional(uid: string) {
    return await this.http.get<GetProfesional>(`${environment.professionalLocalhost}/publicProfile/${uid}`).toPromise();
  }
  async UpdateProfessionalProfile(userdata: any, uid: string | null) {
    // await this.router.navigateByUrl(`/professionals/profile/${uid}`);
    return await this.http.put<Professional>(`${environment.professionalLocalhost}/edit/${uid}`, userdata).toPromise();
  }
  async DeleteProfessionalProfile() {
    await firebase.default.auth().currentUser?.delete();
    this.cookies.deleteAll();
  }
  async DeleteProfessionalData(uid: string) {
    return this.http.delete(`${environment.professionalLocalhost}/delete/${uid}`).toPromise();
  }
}