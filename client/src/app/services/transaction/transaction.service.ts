import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {
  public API = 'http://localhost:8080';
  public TRANSACTION_API = this.API + '/transaction';

  constructor(private http: HttpClient) {
  }

  getAll(account_number: Number): Observable<any> {
    return this.http.get(this.TRANSACTION_API + '/all/'+account_number);
    //return this.http.get(this.API + '/all');
  }


  /* DON'T KNOW IF WE NEED THIS */
  /** 
  get(id: string) {
    return this.http.get(this.TRANSACTION_API + '/' + id);
  }*/

  /*TODO: NEED TO WORK ON UPDATION */
  /** 
  save(transaction: any): Observable<any> {
    let result: Observable<Object>;
    if (transaction['href']) {
      result = this.http.put(transaction.href, transaction);
    } else {
      result = this.http.post(this.TRANSACTION_API, transaction);
    }
    return result;
  }*/

  /** TODO: ADD HIDE FEATURE */
}
