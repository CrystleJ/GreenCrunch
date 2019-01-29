import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { OktaCallbackComponent} from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const router: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'car-list', component: CarListComponent },
    { path: 'car-add', component: CarEditComponent },
    { path: 'car-edit/:id', component: CarEditComponent},
    { path: 'implicit/callback', component: OktaCallbackComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},

    { path: '**', redirectTo: 'home'}
   
    
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);