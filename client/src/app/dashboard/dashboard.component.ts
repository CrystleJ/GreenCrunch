import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { UserService } from '../services/user/user.service';
import { User } from '../model/user';
import { TransactionService } from '../services/transaction/transaction.service';
import { Transaction } from '../model/transaction';
import { Budget } from '../model/budget';
import { Chart } from 'chart.js';

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

  current: Map<String, Budget> = new Map([
    ["Bill&utilities", {amount: 0, percent: 0, name: "Bill&utilities", class: "bar primary"}], 
    ["Shopping", {amount: 0, percent: 0, name: "Shopping", class: "bar secondary"}],
    ["Food&drinks", {amount: 0, percent: 0, name: "Food&drinks", class: "bar success"}], 
    ["Groceries", {amount: 0, percent: 0, name: "Groceries", class: "bar warning"}],
    ["Entertainment", {amount: 0, percent: 0, name: "Entertainment", class: "bar alert"}], 
    ["Misc", {amount: 0, percent: 0, name: "Misc", class: "bar primary"}],]);

  // ADD CHART OPTIONS. 
  // pieChartOptions = {
  //   responsive: true
  // }

  // pieChartLabels :String[] =  ['Bill&utilities', 'Shopping', 'Food&drinks', 'Groceries', 'Entertainment', 'Misc'];

  // CHART COLOR.
  // pieChartColor:any = [
  //     {
  //         backgroundColor: ['rgba(30, 169, 224, 0.8)',
  //         'rgba(255,165,0,0.9)',
  //         'rgba(139, 136, 136, 0.9)',
  //         'rgba(255, 161, 181, 0.9)',
  //         'rgba(255, 102, 0, 0.9)',
  //         'rgba(255, 102, 156, 0.9)'
  //         ]
  //     }
  // ]

  // data:any = [0,0,0,0,0,0];
  // pieChartData = this.getBudget();

  // chart = new Chart('canvas', {
  //   type: "pie",
  //   labels: ['Bill&utilities', 'Shopping', 'Food&drinks', 'Groceries', 'Entertainment', 'Misc'],
  //   datasets: {
  //     label: "Your spending",
  //     data: [0,0,0,0,0,0],
  //     backgroundColor: ['rgba(30, 169, 224, 0.8)',
  //                         'rgba(255,165,0,0.9)',
  //                         'rgba(139, 136, 136, 0.9)',
  //                         'rgba(255, 161, 181, 0.9)',
  //                         'rgba(255, 102, 0, 0.9)',
  //                         'rgba(255, 102, 156, 0.9)'
  //                       ],
  //   },
  //   options: {
  //     legend: {
  //       display: true
  //     },
  //     responsive: true
  //   }
  // });

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
            // this.getBudget();
            this.userService.getCreditScore(this.user.email)
                .subscribe(data => {console.log('Credit score: '+data); 
                                    this.creditScore = data; 
                                    this.creditScoreExists=true;});
            this.getTransactions();
            this.getByCategory();
          }
        });
    }
  }

  // getBudget() {
  //   // var data = [0,0,0,0,0,0];
  //   this.transactionService.getAll(this.user.email)
  //   .subscribe(transactions => { 
  //     this.transactions = transactions
  //     console.log(this.chart.config);
  //     for(let i of this.transactions) {
  //       var j = this.chart.config.labels.indexOf(i.category);
  //       this.chart.config.datasets.data[j] += i.amount;
  //       // var j = this.pieChartLabels.indexOf(i.category);
  //       // data[j] += i.amount;
  //     }
  //     // this.chart.datasets.data = this.pieChartData;
  //     console.log('chart data');
  //     console.log(this.chart.config.datasets.data);
  //   });
  // }

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

  getByCategory() {
    this.transactionService.getAll(this.user.email)
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

  getCurrent(): Array<Budget> {
    return Array.from(this.current.values());
  }
}
