import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterValidators } from 'src/app/shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any;
  error: any;

  constructor(private services: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        RegisterValidators.WhiteSpacesNotAllowed
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        RegisterValidators.WhiteSpacesNotAllowed
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-za-z0-9._%+-]+@[a-z]{3,6}\.[a-z]{2,4}$'),
        // // RegisterValidators.CheckForEmail //TODO
      ])),
      phonenumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(10)
      ])),
      strNumber: new FormControl('', Validators.compose([
        Validators.required
      ])),
      addressLine: new FormControl('', Validators.compose([
        Validators.required,
        RegisterValidators.WhiteSpacesNotAllowed
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
        RegisterValidators.WhiteSpacesNotAllowed
      ])),
      zipCode: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$'),
        Validators.minLength(8),
        Validators.maxLength(13),
        RegisterValidators.WhiteSpacesNotAllowed
      ])),
      repeatpass: new FormControl('', Validators.compose([
        Validators.required,
        RegisterValidators.equalPasswords('password'),
        RegisterValidators.WhiteSpacesNotAllowed
      ]))
    });
  }

  async SignInWithEmailAndPassword(userdata:any){
    return await this.services.UserSignUpWithEmailAndPassword(userdata).catch(err => {
      this.error = err;
      this.form.reset();
});;
  }
  
}
