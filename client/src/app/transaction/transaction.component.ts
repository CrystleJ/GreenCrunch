import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionService } from '../services/transaction/transaction.service';
import { Transaction } from '../model/transaction';
//import { OktaAuthService } from '@okta/okta-angular';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[];
  //accountNumber: Number = 84673428;
  user_email: String;
 
  constructor(private transactionService: TransactionService, private oauthService: OAuthService) { }
 
  ngOnInit() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      alert('An error occured');
    } else {
      console.log(claims);
      this.user_email = claims['email'];
      this.reloadData();
    }
  }
 
 
  reloadData() {
    //this.customers = this.transactionService.getAll();
    this.transactionService.getAll(this.user_email)
      .subscribe(transactions => this.transactions = transactions);
  }
  /*public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    //opt_firstRowIsData: true,
    options: {'title': 'Tasks'},
  };*/
}

