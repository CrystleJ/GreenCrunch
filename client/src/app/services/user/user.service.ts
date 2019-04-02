import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {Bank} from '../../model/bank';

@Injectable()
export class UserService {

  public API = 'http://localhost:8080';
  public USER_API = this.API + '/user';

  constructor(private http: HttpClient) {
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.USER_API}` + `/create`, user);
  }

  updateUserBank(email: String, num: number): Observable<Object> {
    return this.http.put(`${this.USER_API}/${email}`, {acctnum: num});
  }

  updateGoal(email: String, budget: JSON) : Observable<Object> {
    return this.http.put(`${this.USER_API}/${email}` + `/updateGoal`, JSON.stringify(budget));
  }

  getGoal(email: String) : Observable<any>{
    return this.http.get(`${this.USER_API}/${email}`+ `/getGoal`);
  }
}
