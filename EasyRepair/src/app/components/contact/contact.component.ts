import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import * as firebase from 'firebase/compat/app';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: any;
  sendFromEmail!: string;

  constructor(private location: Location,
    private cookies: CookieService
  ) { }

  ngOnInit() {

    this.sendFromEmail = this.cookies.get('email');

    this.form = new FormGroup({
      sendFrom: new FormControl(this.sendFromEmail),
      sendTo: new FormControl(''),
      label: new FormControl(''),
      message: new FormControl('')
    });
  }

  async getEmail() {

  }
  sendMessage(messageData: any) {
    console.log(messageData);

  }
  goBack() {
    this.location.back();
  }
}
