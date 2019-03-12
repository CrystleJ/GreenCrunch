import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
//import { OktaAuthService } from '@okta/okta-angular';
import { OAuthService } from 'angular-oauth2-oidc';

import {UserService} from '../services/user/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  user: User = new User();
  addAcctForm: FormGroup;
  isAuthenticated: boolean;
 
  // TODO: check if user already exists
  constructor(private userService: UserService, 
                private fb: FormBuilder,
                private router: Router,
                //private oktaAuth: OktaAuthService,
                private oauthService: OAuthService) {
  }
 
  async ngOnInit() {
    this.addAcctForm = this.fb.group({
      'acctnum': ['', [
        Validators.required
      ]
      ]});

    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // // Subscribe to authentication state changes
    // this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    // );

    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      alert('An error occured');
    } else {
      console.log(claims);
      this.user.email = claims['email'];
      this.user.name = claims['name'];
      this.newUser();
    }
  }

  get acctnum() { return this.addAcctForm.get('acctnum') }
 
  newUser(): void {
    this.userService.createUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  updateBank(acctnum: number) {
    this.userService.updateUserBank(this.user.email, acctnum)
      .subscribe(
        data => {
          console.log(data);
          this.user = data as User;
        },
        error => console.log(error));
    
    this.router.navigate(['/dashboard']);
  }
 
  onSubmit() {
    console.log(this.acctnum.value);
    this.updateBank(this.acctnum.value);
  }

}
