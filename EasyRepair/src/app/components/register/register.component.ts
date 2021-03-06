import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterValidators } from 'src/app/shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges {
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
      this.router.navigateByUrl('/main');
    };

    this.form = new FormGroup({

      role: new FormControl('', Validators.required),
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
      profession: new FormControl(''),
      // yourprofession!: new FormControl('', Validators.required),
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
  ngOnChanges() {
    this.role;
    this.profession;
  }
  raidoValue(data: any) {

    if (data.target.id) {
      this.role = true;

      if (data.target.id === 'professional') {
        this.profession = true;
      } else {
        this.profession = false;
      }
    }
  }
  async SignUpWithEmailAndPassword(data: any) {

    await this.service.SignUpWithEmailAndPassword(data).catch(err => {
      this.error = err;
    });
  }

}