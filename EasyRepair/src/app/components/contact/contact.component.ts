import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ProfessionalService } from 'src/app/services/professionals/professional.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: any;
  sendFromEmail!: string;

  constructor(private location: Location,
    private cookies: CookieService,
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
  sendMessage(messageData: any) {
    console.log(messageData);

  }
  goBack() {
    this.location.back();
  }
}
