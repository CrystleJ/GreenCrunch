import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { BudgetComponent } from './budget/budget.component';
import { ArticlesComponent } from './articles/articles.component';
import {AuthGuard} from './services/okta/authguard';

export const router: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'team', component: TeamComponent},
    {path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},
    {path: 'transaction', component: TransactionComponent,  canActivate: [AuthGuard]},
    {path: 'budget', component: BudgetComponent,  canActivate: [AuthGuard]},
    {path: 'articles', component: ArticlesComponent,  canActivate: [AuthGuard]},


    { path: '**', redirectTo: 'home'}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);