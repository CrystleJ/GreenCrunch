import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';


import { UserService } from '../services/user/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  exists:number;
  addAcctForm: FormGroup;
  user = new User();

  constructor(private oauthService: OAuthService,
              private fb: FormBuilder,
              private userService: UserService,
              ) {}

  async ngOnInit() {
    this.addAcctForm = this.fb.group({
      'acctnum': ['', [
        Validators.required
      ]
      ]});

    const claims = this.oauthService.getIdentityClaims();
    if (claims) {
      this.userService.checkUser(claims['email'])
        .subscribe(exists => {
          console.log("Data: "+exists);
          if(!exists) {
            this. user.email = claims['email'];
            this.user.name = claims['name'];
            //user.acctnum = claims['acctnum'];
            console.log(this.user);
            this.userService.createUser(this.user)
                .subscribe(data => {console.log(data); document.getElementById('myModal').style.display = 'block';}, error => console.log(error));
          } else {
            console.log("Found");
          }
        });
    }
  }

  get acctnum() { return this.addAcctForm.get('acctnum') }

  updateBank(acctnum: number) {
    this.userService.updateUserBank(this.user.email, acctnum)
      .subscribe(
        data => {
          console.log(data);
          this.user = data as User;
          document.getElementById('myModal').style.display = 'none';
        },
        error => console.log(error));
  }
 
  onSubmit() {
    console.log(this.acctnum.value);
    this.updateBank(this.acctnum.value);
  }

}
