import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Routes
import { routes } from './app.router';

/*Okta */
//import { OktaAuthModule } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/okta/auth.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';

/* Services */
import { CarService } from './services/car/car.service';
import {GiphyService} from './services/giphy/giphy.service';
import {TransactionService} from './services/transaction/transaction.service';
import {UserService} from './services/user/user.service';

/* Components */
import { CarListComponent } from './car-list/car-list.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {Ng2CarouselamosModule} from 'ng2-carouselamos';
import { BudgetComponent } from './budget/budget.component';

import { NewUserComponent } from './new-user/new-user.component';
//import { Ng2GoogleChartsModule } from 'ng2-google-charts';


// const config = {
//   issuer: 'https://dev-872814.oktapreview.com/oauth2/default',
//   redirectUri: 'http://localhost:4200/home',
//   clientId: '0oahconykz3JdCVDD0h7',
//   scope: 'openid profile email',
// };

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarEditComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    TeamComponent,
    TransactionComponent,
    DashboardComponent,
    BudgetComponent,
    NewUserComponent
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    routes,
    HttpModule,
    Ng2GoogleChartsModule,
    Ng2CarouselamosModule,
    ReactiveFormsModule,
    //Ng2GoogleChartsModule,
    //OktaAuthModule.initAuth(config),
    OAuthModule.forRoot()
  ],
  providers: [CarService,
    GiphyService,
    TransactionService, 
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
