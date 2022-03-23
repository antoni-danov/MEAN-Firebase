import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GetProfessional } from 'src/app/models/Professional/GetProfessional';
import { Professional } from 'src/app/models/Professional/Professional';
import { UpdateProfessional } from 'src/app/models/Professional/UpdateProfessional';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfessionalService } from 'src/app/services/professionals/professional.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: any;
  message!: string;
  updateInformation!: UpdateProfessional;
  email!: string;

  action: 'profile' | 'update' = 'profile';
  uid: string;
  userInfo!: Professional;
  profileAllPublic!: GetProfessional;
  isOwner: boolean | undefined;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfessionalService,
    private cookie: CookieService,
    private auth: AuthService
  ) {
    this.uid = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {

    this.checkUser();

    if (this.isOwner === true) {
      this.getUserInfo();
    } else {
      this.publicProfile();
    }

    this.form = new FormGroup({
      phonenumber: new FormControl(''),
      strNumber: new FormControl(''),
      addressLine: new FormControl(''),
      city: new FormControl(''),
      zipCode: new FormControl(''),
      profession: new FormControl('')
    });
  }


  get profile() {
    return this.action === 'profile';
  }
  get update() {
    return this.action === 'update';
  }
  async getUserInfo() {
    return await this.service.GetProfessionalById(this.uid).then(data => {
      this.userInfo = data;
    });
  }
  async publicProfile() {
    return await this.service.PublicProfessional(this.uid).then(data => {
      this.profileAllPublic = data;
    });

  }
  async setDefaultForm() {

    this.action = 'update';

    this.updateInformation = {
      phonenumber: this.userInfo.phonenumber,
      strNumber: this.userInfo.address.strNumber,
      addressLine: this.userInfo.address.addressLine,
      city: this.userInfo.address.city,
      zipCode: this.userInfo.address.zipCode,
      profession: this.userInfo.profession
    };

    await this.form.setValue(this.updateInformation);
  }
  async updateUser(userdata: any) {

    if (userdata) {

      if (confirm('Would you like to save changes?')) {
        return await this.service.UpdateProfessionalProfile(userdata, this.uid).then(data => {
          this.action = 'profile';
          this.ngOnInit();
        });
      } else {
        return this.goBack();
      }
    };

    return null;
  }
  deleteProfile() {
    if (confirm('You are about to delete your account')) {

      this.service.DeleteProfessionalData(this.uid);
      this.service.DeleteProfessionalProfile();
      this.auth.SignOut();
      this.router.navigateByUrl('/');
      console.log('You was removed');

    } else {
      this.message = 'This time was close!';
      alert(this.message);
    }
  }
  async goBack() {
    this.action = "profile";
    await this.router.navigateByUrl(`/professionals/profile/${this.uid}`);
  }
  checkUser() {
    const profileUid = this.cookie.get('uid');
    const currentUser = this.uid;

    if (profileUid === currentUser) {
      return this.isOwner = true;
    }

    return this.isOwner = false;
  }
  //Get email to send the message
  getEmail(event: any) {
    this.email = event.target.innerText;
    this.router.navigate(['/contact'], { state: { sendTo: this.email } });
    // this.router.navigateByUrl('/contact');
  }
}
