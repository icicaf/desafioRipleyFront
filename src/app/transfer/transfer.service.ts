import { Transfer } from './transfer.model'
import { Subject } from "rxjs"
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransferService{
  baseUrl = environment.baseUrl;
  customerId = sessionStorage.getItem('customerId');
  data:any={};

  private trasfersList: Transfer[] = [];

  private transfersSubject = new Subject<Transfer[]>();

  constructor(private router: Router, private http: HttpClient) {}

  getTransfers() {
    this.http.get<Transfer[]>(this.baseUrl + 'api/transfer/'+this.customerId).subscribe((response) => {
      this.data = response;
      if(this.data.data.length) {
        const tempdata = this.data.data;
        this.trasfersList = tempdata;
        this.transfersSubject.next([...this.trasfersList]);
      } else {
        this.transfersSubject.next([]);
      }
    });
    return this.trasfersList.slice();
  }

  makeTransfer(transference: Transfer) {
    console.log("insertar transferencia");
    this.http
      .post<any>(this.baseUrl + 'api/transfer', transference)
      .subscribe((response) => {
        this.data = response;
        console.log(this.data)
    });
  }

  getListener() {
    return this.transfersSubject.asObservable();
  }

}
