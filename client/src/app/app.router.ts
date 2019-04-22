import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { BudgetComponent } from './budget/budget.component';
import { ArticlesComponent } from './articles/articles.component';
export const router: Routes = [
    { path: 'home', component: HomeComponent},
    //{ path: 'implicit/callback', component: OktaCallbackComponent },
    {path: 'about', component: AboutComponent},
    {path: 'team', component: TeamComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'transaction', component: TransactionComponent},
    {path: 'budget', component: BudgetComponent},
    {path: 'articles', component: ArticlesComponent},


    { path: '**', redirectTo: 'home'}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);