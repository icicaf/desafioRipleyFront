import { Subject } from "rxjs"
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Destinatary } from './destinatary.model'
import { Bank } from "./bank.model";

@Injectable({
  providedIn: 'root'
})
export class DestinataryService {
  baseUrl = environment.baseUrl;
  customerId = sessionStorage.getItem('customerId');
  data:any={};

  private destinataryList: Destinatary[] = [];
  private destinatarySubject = new Subject<Destinatary[]>();

  private banksList: Bank[] = [];
  private banksSubject = new Subject<Bank[]>();

  constructor(private router: Router, private http: HttpClient) {}

  getDestinatary() {
    this.http.get<Destinatary[]>(this.baseUrl + 'api/destinatary/'+this.customerId)
    .subscribe((response) => {
      this.data = response;
      if(this.data.data.length) {
        const tempdata = this.data.data;
        this.destinataryList = tempdata;
        this.destinatarySubject.next([...this.destinataryList]);
      } else {
        this.destinatarySubject.next([]);
      }
    });
    return this.destinataryList.slice();
  }

  saveDestinatary(destinatary: Destinatary): any {
    this.http.post(this.baseUrl + 'api/destinatary', destinatary)
      .subscribe((response) => {
        this.data = response;
        if(this.data.data.result) {
          console.log("paso true");
          const tempdata = this.data.data;
          this.destinataryList = tempdata;
          this.destinataryList.push(destinatary);
          this.destinatarySubject.next([...this.destinataryList]);
        } else {
          console.log("paso pr false");
          this.destinatarySubject.next([]);
        }
    });
  }

  getListener() {
    return this.destinatarySubject.asObservable();
  }

  getBanks() {
    this.http.get<Bank[]>(this.baseUrl + 'api/bank')
    .subscribe((response) => {
      this.data = response;
        this.banksList = response;

        this.banksSubject.next([...this.banksList]);
        return this.banksList;
    });
    return this.banksList.slice();
  }

}
