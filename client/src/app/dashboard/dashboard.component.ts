import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';


import { UserService } from '../services/user/user.service';
import { User } from '../model/user';
import { TransactionService } from '../services/transaction/transaction.service';
import { Transaction } from '../model/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  exists:number;
  addAcctForm: FormGroup;
  user = new User();
  avgScore:number = 695;
  avgCAScore:number = 754;
  creditScore:number;
  creditScoreExists:boolean=false;
  transactions: Transaction[];

  constructor(private oauthService: OAuthService,
              private fb: FormBuilder,
              private userService: UserService,
              private transactionService: TransactionService
              ) {}

  async ngOnInit() {
    this.addAcctForm = this.fb.group({
      'acctnum': ['', [
        Validators.required
      ]
      ]});

    const claims = this.oauthService.getIdentityClaims();
    if (claims) {
      this.userService.checkUser(claims['email'])
        .subscribe(exists => {
          console.log("Data: "+exists);
          this.user.email = claims['email'];
          if(!exists) {
            this.user.name = claims['name'];
            //user.acctnum = claims['acctnum'];
            console.log(this.user);
            this.userService.createUser(this.user)
                .subscribe(data => {console.log(data); document.getElementById('myModal').style.display = 'block';}, error => console.log(error));
          } else {
            console.log("Found");
            this.userService.getCreditScore(this.user.email)
                .subscribe(data => {console.log('Credit score: '+data); 
                                    this.creditScore = data; 
                                    this.creditScoreExists=true;});
            this.getTransactions();
          }
        });
    }
  }

  get acctnum() { return this.addAcctForm.get('acctnum') }

  updateBank(acctnum: number) {
    this.userService.updateUserBank(this.user.email, acctnum)
      .subscribe(
        data => {
          console.log(data);
          this.user = data as User;
          document.getElementById('myModal').style.display = 'none';
        },
        error => console.log(error));
  }
  
 
  onSubmit() {
    console.log(this.acctnum.value);
    this.updateBank(this.acctnum.value);
  }

  greaterThan() {
    return this.creditScore >= this.avgScore && this.creditScore >= this.avgCAScore;
  }

  getTransactions() {
    this.transactionService
      .getAll(this.user.email)
      .subscribe(transactions => 
        this.transactions = this.filterByDate(transactions.sort(
          (a:Transaction, b:Transaction)=> {
            return +new Date(b.date_time) - +new Date(a.date_time);})));
  }

  filterByDate(allTransactions: Transaction[]):Transaction[] {
    var newTransactions: Transaction[] = [];
    for(var i =0; i < allTransactions.length; i++) {
      newTransactions[i] = allTransactions[i];
      if(i == 4) {
        i = allTransactions.length;
      }
    }
    console.log('Filtered transactions:');
    console.log(newTransactions);
    return newTransactions;
  }

}
