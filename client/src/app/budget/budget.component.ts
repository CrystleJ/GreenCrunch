import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TransactionService } from '../services/transaction/transaction.service';
import { Transaction } from '../model/transaction';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../services/user/user.service';
import { User } from '../model/user';
import { IfObservable } from 'rxjs/observable/IfObservable';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  user_email: String;
  transactions: Transaction[];
  editGoalForm: FormGroup;
  budget: String;
  totals: Map<String, number> = new Map([
    ["Bill&utilities", 0], 
    ["Shopping", 0],
    ["Food&drinks", 0], 
    ["Groceries", 0],
    ["Entertainment", 0], 
    ["Misc", 0],
  ]);

  constructor(private userService: UserService, 
    private transactionService: TransactionService,
    private oauthService: OAuthService, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.editGoalForm = this.fb.group({
      bills: new FormControl("", Validators.required),
      shopping: new FormControl("", Validators.required),
      food: new FormControl("", Validators.required),
      groceries: new FormControl("", Validators.required),
      entertainment: new FormControl("", Validators.required),
      misc: new FormControl("", Validators.required)
    }); 
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      alert('An error occured');
    } else {
      console.log(claims);
      this.user_email = claims['email'];
      this.loadData();
      this.getByCategory();
      this.getBudget()
    }
  }

  get bills() {
    return this.editGoalForm.get("bills");
  }
  get shopping() {
    return this.editGoalForm.get("shopping");
  }
  get food() {
    return this.editGoalForm.get("food");
  }
  get groceries() {
    return this.editGoalForm.get("groceries");
  }
  get entertainment() {
    return this.editGoalForm.get("entertainment");
  }
  get misc() {
    return this.editGoalForm.get("misc");
  }

  editGoal() {
    const newGoal: any = {
      "bill&utilities": this.bills.value,
      "shopping": this.shopping.value,
      "food&drinks": this.food.value,
      "groceries": this.groceries.value,
      "entertainment": this.entertainment.value,
      "misc": this.misc.value 
    };
    var output:JSON = <JSON>newGoal;
    console.log(output);
    // this.userService.updateGoal(this.user_email, output)
    // .subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   error => console.log(error));
    
  }

  loadData() {
    console.log("Getting user data: " + this.user_email)
    //hardcoded values
    var output: JSON;
    var obj: any = 
    {
    "bill&utilities": 500,
    "shopping": 500,
    "food&drinks": 200,
    "groceries": 200,
    "entertainment": 100,
    "misc": 400
    }
    output = <JSON>obj;
    this.userService.updateGoal(this.user_email, output)
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
  }

  getByCategory() {
    this.transactionService.getAll(this.user_email)
    .subscribe(transactions => { this.transactions = transactions

      for(let i of this.transactions) {
        var cat = this.totals.get(i.category)
        console.log(cat)
        if(cat != null) {
          console.log("Getting by category")
          console.log(i.amount)
          this.totals.set(i.category, cat+i.amount)
        }
        else
          console.log("DNE")
      }
      console.log("TOTAL:")
      console.log("Map", this.totals)
    });
  }

  getBudget(){
    console.log("reached")
    this.userService.getGoal(this.user_email)
    .subscribe(budget => this.budget = budget);
    console.log(this.budget)
  }

}
