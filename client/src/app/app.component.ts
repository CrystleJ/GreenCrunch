import { Component, OnInit } from '@angular/core';
//import { OktaAuthService } from '@okta/okta-angular';
import {Router} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './services/okta/authconfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isAuthenticated: boolean;

  constructor(//private oktaAuth: OktaAuthService, 
                private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit() {
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // // Subscribe to authentication state changes
    // this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    // );
  }
}
