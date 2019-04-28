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
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetComponent } from './budget/budget.component';
import { ArticlesComponent } from './articles/articles.component';
import { ChartsModule } from 'ng2-charts'
import { AuthGuard } from './services/okta/authguard';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarEditComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    TeamComponent,
    TransactionComponent,
    DashboardComponent,
    BudgetComponent,
    ArticlesComponent
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
    ReactiveFormsModule,
    ChartsModule,
    OAuthModule.forRoot()
  ],
  providers: [CarService,
    GiphyService,
    TransactionService, 
    UserService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
