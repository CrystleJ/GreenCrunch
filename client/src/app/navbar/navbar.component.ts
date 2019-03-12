import { Component, OnInit } from '@angular/core';

//import { OktaAuthService } from '@okta/okta-angular';
import {Router} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = true;

  constructor(//private oktaAuth: OktaAuthService,
                private oauthService: OAuthService, 
                private router: Router) {
  }

  ngOnInit() {
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // // Subscribe to authentication state changes
    // this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    // );
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

}
