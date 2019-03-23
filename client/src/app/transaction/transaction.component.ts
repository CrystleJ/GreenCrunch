import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';

import { TransactionService } from '../services/transaction/transaction.service';
import { Transaction } from '../model/transaction';
import { Bank } from '../model/bank';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions: Transaction[];
  acctnum: number;
  user_email: String;
  addTransactionForm: FormGroup;
  editTransactionForm: FormGroup;
  isEdit:boolean = false;
  checkID:number;
 
  constructor(private transactionService: TransactionService, 
                private oauthService: OAuthService, 
                private fb: FormBuilder,) { }
 
  ngOnInit() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      alert('An error occured');
    } else {
      console.log(claims);
      this.user_email = claims['email'];
      this.reloadData();
      this.getBank();
    }

    this.addTransactionForm = this.fb.group({
      add_date: new FormControl('', Validators.required),
      add_item: new FormControl('', Validators.required),
      add_type: new FormControl('', Validators.required),
      add_amt: new FormControl('', Validators.required),
      add_categ: new FormControl('', Validators.required)
    });
    
    this.editTransactionForm = this.fb.group({
      'date': ['', [
        Validators.required
      ]],
      'item': ['', [
        Validators.required
      ]],
      'type': ['', [
        Validators.required
      ]],
      'amt': ['', [
        Validators.required
      ]],
      'categ': ['', [
        Validators.required
      ]],
    });
  }
 
  get add_date() { return this.addTransactionForm.get('add_date') }
  get add_item() { return this.addTransactionForm.get('add_item') }
  get add_type() { return this.addTransactionForm.get('add_type') }
  get add_amount() { return this.addTransactionForm.get('add_amt') }
  get add_category() { return this.addTransactionForm.get('add_categ') }

  get edit_date() { return this.editTransactionForm.get('date') }
  get edit_item() { return this.editTransactionForm.get('item') }
  get edit_type() { return this.editTransactionForm.get('type') }
  get edit_amount() { return this.editTransactionForm.get('amt') }
  get edit_category() { return this.editTransactionForm.get('categ') }

 
  reloadData() {
    //this.customers = this.transactionService.getAll();
    this.transactionService.getAll(this.user_email)
      .subscribe(transactions => this.transactions = transactions);
  }

  getBank() {
    this.transactionService.getBankAcct(this.user_email)
      .subscribe(acctnum => this.acctnum = acctnum);
  }

  add() {
    // var bank = new Bank();
    // bank.account_number = this.acctnum;

    console.log("Trying to add new transaction for: " + this.acctnum);

    var transaction = new Transaction();
    transaction.date_time = this.add_date.value;
    transaction.item = this.add_item.value;
    transaction.type = this.add_type.value;
    transaction.amount = this.add_amount.value;
    transaction.category = this.add_category.value;
    console.log("Adding transaction");
    this.transactionService.createTransaction(this.acctnum, transaction)
      .subscribe(data => console.log(data), error => console.log(error));
    
    document.getElementById('id01').style.display='none';
    window.location.reload(true);
  }

  hide(id:number) {
    console.log("Transaction id is: "+id);
  }

  edit(id:number) {
    console.log("Transaction id is: "+id);
    var transaction = new Transaction();
    transaction.date_time = this.edit_date.value;
    transaction.item = this.edit_item.value;
    transaction.type = this.edit_type.value;
    transaction.amount = this.edit_amount.value;
    transaction.category = this.edit_category.value;
    //this.isEdit = false;
    console.log("Editing transaction");
    this.transactionService.updateUserTransaction(id, transaction)
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
    
    window.location.reload(true);
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

