import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterValidators } from 'src/app/shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  form: any;
  error!: string;
  role: boolean = false;
  profession: boolean = false;

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.service.isAuthenticated()) {
      this.router.navigateByUrl('/professionals');
    };

    this.form = new FormGroup({
      role: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-za-z0-9._%+-]+@[a-z]{3,6}\.[a-z]{2,4}$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        RegisterValidators.WhiteSpacesNotAllowed
      ]))
    });
  }
  ngOnChanges() {
    this.role;
  }
  raidoValue(data: any) {
    if (data) {
      this.role = true;
    }
  }
  async SignInEmailAndPassword(userdata: any) {

    await this.service.SignInWithEmailAndPassword(userdata).catch((err) => {
      this.error = err;
      this.form.reset();
    });

  }
  async PopUpGoogle() {
    await this.service.SignInWithPopUp().then(data => { });
  }

}