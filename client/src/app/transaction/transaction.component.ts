import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionService } from '../services/transaction/transaction.service';
import { Transaction } from '../model/transaction';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[];
  accountNumber: Number = 84673428;
 
  constructor(private transactionService: TransactionService) { }
 
  ngOnInit() {
    this.reloadData();
  }
 
 
  reloadData() {
    //this.customers = this.transactionService.getAll();
    this.transactionService.getAll(this.accountNumber)
      .subscribe(transactions => this.transactions = transactions);

    console.log(this.transactions);
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

