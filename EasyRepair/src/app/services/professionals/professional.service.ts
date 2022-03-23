import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Professional } from 'src/app/models/Professional/Professional';
import { GetProfessional } from 'src/app/models/Professional/GetProfessional';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  role: string | undefined;
  user: any;
  publicProfile!: GetProfessional;
  email!: string;

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
  async GetAllProfessionals(): Promise<GetProfessional[]> {
    return await this.http.get<GetProfessional[]>(`${environment.professionalLocalhost}/all`).toPromise();
  }
  async GetByProfession(userdata: string): Promise<GetProfessional[]> {
    return await this.http.get<GetProfessional[]>(`${environment.professionalLocalhost}/profession/${userdata}`).toPromise();
  }
  async GetProfessionalById(uid: string): Promise<Professional> {
    return await this.http.get<Professional>(`${environment.professionalLocalhost}/profile/${uid}`).toPromise();
  }
  async PublicProfessional(uid: string): Promise<GetProfessional> {
    return await this.http.get<GetProfessional>(`${environment.professionalLocalhost}/publicProfile/${uid}`).toPromise();
  }
  async UpdateProfessionalProfile(userdata: any, uid: string | null) {
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