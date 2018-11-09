import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { OktaCallbackComponent} from '@okta/okta-angular';

//import {AppComponent} from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { HomeComponent } from './home/home.component';

export const router: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'car-list', component: CarListComponent },
    { path: 'car-add', component: CarEditComponent },
    { path: 'car-edit/:id', component: CarEditComponent},
    { path: 'implicit/callback', component: OktaCallbackComponent },
    { path: 'home', component: HomeComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);