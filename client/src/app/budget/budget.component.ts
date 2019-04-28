import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TransactionService } from '../services/transaction/transaction.service';
import { Transaction } from '../model/transaction';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../services/user/user.service';
import { Budget } from '../model/budget';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  user_email: String;
  transactions: Transaction[];
  editGoalForm: FormGroup;
  budget: any;
  current: Map<String, Budget> = new Map([
    ["Bill&utilities", {amount: 0, percent: 0, name: "Bill&utilities", class: "bar primary"}], 
    ["Shopping", {amount: 0, percent: 0, name: "Shopping", class: "bar secondary"}],
    ["Food&drinks", {amount: 0, percent: 0, name: "Food&drinks", class: "bar success"}], 
    ["Groceries", {amount: 0, percent: 0, name: "Groceries", class: "bar warning"}],
    ["Entertainment", {amount: 0, percent: 0, name: "Entertainment", class: "bar alert"}], 
    ["Misc", {amount: 0, percent: 0, name: "Misc", class: "bar primary"}],]);

  goals:  Map<String, Budget> = new Map([
    ["Bill&utilities", {amount: 0, percent: 0, name: "Bill&utilities", class: "bar primary"}], 
    ["Shopping", {amount: 0, percent: 0, name: "Shopping", class: "bar secondary"}],
    ["Food&drinks", {amount: 0, percent: 0, name: "Food&drinks", class: "bar success"}], 
    ["Groceries", {amount: 0, percent: 0, name: "Groceries", class: "bar warning"}],
    ["Entertainment", {amount: 0, percent: 0, name: "Entertainment", class: "bar alert"}], 
    ["Misc", {amount: 0, percent: 0, name: "Misc", class: "bar primary"}],]);

  constructor(private userService: UserService, 
    private transactionService: TransactionService,
    private oauthService: OAuthService, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.editGoalForm = this.fb.group({
      'Bill&utilities': new FormControl("", Validators.required),
      'Shopping': new FormControl("", Validators.required),
      'Food&drinks': new FormControl("", Validators.required),
      'Groceries': new FormControl("", Validators.required),
      'Entertainment': new FormControl("", Validators.required),
      'Misc': new FormControl("", Validators.required)
    }); 
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      alert('An error occured');
    } else {
      console.log(claims);
      this.user_email = claims['email'];
      // this.loadData();
      this.getByCategory();
      this.getBudget()
    }
  }

  get bills() {
    return this.editGoalForm.get("Bill&utilities");
  }
  get shopping() {
    return this.editGoalForm.get("Shopping");
  }
  get food() {
    return this.editGoalForm.get("Food&drinks");
  }
  get groceries() {
    return this.editGoalForm.get("Groceries");
  }
  get entertainment() {
    return this.editGoalForm.get("Entertainment");
  }
  get misc() {
    return this.editGoalForm.get("Misc");
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
    this.userService.updateGoal(this.user_email, output)
    .subscribe(
      data => {
        window.location.reload(true);
      },
      error => console.log(error));
    
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
      var total = 0;
      for(let i of this.transactions) {
        var cat = this.current.get(i.category).amount;
        // console.log(cat);
        if(cat != null) {
          // console.log("Getting by category")
          // console.log(i.amount)

          var curr = this.current.get(i.category);
          curr.amount = cat+i.amount;
          // curr.name = i.category;
          // curr.percent = 0;
          // curr.class = this.classes.get(i.category);
          this.current.set(i.category,curr);
          total += i.amount;
        }
        else
          console.log("current DNE")
      }
      this.current.forEach((value: Budget, key: string) => {
        value.percent = Math.round((value.amount/total)*100);
        this.current.set(key, value);
      });
      console.log('current');
      console.log(this.current);
    });
  }
  
  getBudget(){
    console.log("reached")
    this.userService.getGoal(this.user_email)
    .subscribe(budget => 
      {
        this.budget = new Map<String,Number>(Object.entries(budget));
        var total = 0;
        this.budget.forEach((value: number, key: string) => {
        // for(let i of this.budget) {
          key = key.charAt(0).toUpperCase() + key.slice(1);
          var goal = this.goals.get(key);
          goal.amount = value;
          this.goals.set(key,goal);
          total += value;
        });
        console.log("total",total);
        this.goals.forEach((value: Budget, key: string) => {
          var percent = (value.amount/total)*100;
          value.percent = Math.round(percent);
          this.goals.set(key, value);
        });
        console.log('goals');
        console.log(this.goals);

      });
  }

  getCurrent(): Array<Budget> {
    return Array.from(this.current.values());
  }

  getGoals(): Array<Budget> {
    return Array.from(this.goals.values());
  }

}
