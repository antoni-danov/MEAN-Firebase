import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterValidators } from 'src/app/shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any;
  error: any;

  constructor(private service: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
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

  ProfessionalLogin(userdata: any) {
    return this.service.ProfessionalSignIn(userdata).catch(err => {
      this.error = err;
      this.form.reset();
    });
  }

}
