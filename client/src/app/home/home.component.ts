import { Component, OnInit } from '@angular/core';
//import { OktaAuthService } from '@okta/okta-angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private oauthService: OAuthService, private userService: UserService){//private oktaAuth: OktaAuthService) {
  }

  async ngOnInit() {
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // // Subscribe to authentication state changes
    // this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    // );

    // if(this.isAuthenticated){
    //   const userInfo = await this.oktaAuth.getUser();
    //   console.log(userInfo);
    //   console.log(userInfo.email);
      
    // }

    // TODO: Check if user exists
    // const claims = this.oauthService.getIdentityClaims();
    // if (claims) {
    //   const user_email = claims['email'];
    //   if(this.userService.checkUser(user_email)) {

    //   }
    // }
  }
}
