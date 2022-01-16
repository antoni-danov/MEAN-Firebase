import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: any;
  message: any;
  updateInformation: any;

  action: 'profile' | 'update' = 'profile';
  uid: any;
  userInfo: any;
  isOwner: boolean | undefined;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService,
    private auth: AuthService,
    private cookie: CookieService
  ) {
    this.uid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.checkUser();
    this.getUserInfo();

    this.form = new FormGroup({
      phonenumber: new FormControl(''),
      strNumber: new FormControl(''),
      addressLine: new FormControl(''),
      city: new FormControl(''),
      zipCode: new FormControl('')
    });
  }
  get profile() {
    return this.action === 'profile';
  }
  get update() {
    return this.action === 'update';
  }
  async getUserInfo() {
    return await this.service.GetUserById(this.uid).then(data => {
      this.userInfo = data;      
    });
  }
  async setDefaultForm(){

    this.action = 'update';
    
    this.updateInformation = {
      phonenumber: this.userInfo.phonenumber,
      strNumber: this.userInfo.address.strNumber,
      addressLine: this.userInfo.address.addressLine,
      city: this.userInfo.address.city,
      zipCode: this.userInfo.address.zipCode
    };   

    await this.form.setValue(this.updateInformation);
  }
  async updateUser(userdata: any) {

    if (userdata) {
      if (confirm('Would you like to save changes?')) {
        return await this.service.UpdateUserProfile(userdata, this.uid).then(data => {
          this.userInfo = data;
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

      this.service.DeleteUserData(this.uid);
      this.service.DeleteUserProfile();
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
    await this.router.navigateByUrl(`/user/profile/${this.uid}`);
  }
  checkUser() {
    const profileUid = this.cookie.get('uid');
    const currentUser = this.uid;

    if (profileUid === currentUser) {
      return this.isOwner = true;
    }

    return this.isOwner = false;
  }
}
