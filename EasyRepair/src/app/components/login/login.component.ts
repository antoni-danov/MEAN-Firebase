import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfessionalService } from 'src/app/services/professionals/professional.service';
import { UserService } from 'src/app/services/user/user.service';
import { RegisterValidators } from 'src/app/shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  error!: string;
  role: boolean = false;
  profession: boolean = false;

  constructor(
    private service: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      role: new FormControl(''),
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

  raidoValue(data: any) {
    if (data) {
      this.role = true;

      if (data.target.id === 'professional') {
        this.profession = true;
      } else {
        this.profession = false;
      }
    }
  }

  SignInEmailAndPassword(userdata: any) {

    this.service.SigInWithEmailAndPassword(userdata).catch((err) => {
      this.error = err.message;
      this.form.reset();
    });

  }
}
