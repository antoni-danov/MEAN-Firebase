import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: any;
  sendFromEmail: any;

  constructor() { }

  ngOnInit() {

    this.sendFromEmail = firebase.default.auth().currentUser?.email;

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
}
