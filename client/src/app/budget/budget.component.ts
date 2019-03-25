import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TransactionService } from '../services/transaction/transaction.service';
import { Transaction } from '../model/transaction';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../services/user/user.service';
import { User } from '../model/user';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  user_email: String;
  transactions: Transaction[];

  constructor(private userService: UserService, 
    private transactionService: TransactionService,
    private oauthService: OAuthService, 
    private fb: FormBuilder) { }

  ngOnInit() { 
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      alert('An error occured');
    } else {
      console.log(claims);
      this.user_email = claims['email'];
      this.loadData();
      this.getByCategory("Utilities")
    }
  }

  loadData() {
    console.log("Getting user data: " + this.user_email)
    let x = new Map<string, number>().set("bills", 1000).set("grocery", 200)
    console.log(x)
    this.userService.updateGoal(this.user_email, x)
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
  }

  getAllTransactions() {
    this.transactionService.getAll(this.user_email)
    .subscribe(transactions => this.transactions = transactions);
  }

  getByCategory(category: string){
    this.getAllTransactions()
    for(let i of this.transactions){
      if(i.category == category) {
        console.log("Getting by category")
        console.log(i)
      }
    }

  }

}
