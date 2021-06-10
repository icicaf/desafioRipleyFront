import { Subject } from "rxjs"
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Destinatary } from './destinatary.model'

@Injectable({
  providedIn: 'root'
})
export class DestinataryService {
  baseUrl = environment.baseUrl;
  customerId = sessionStorage.getItem('customerId');
  data:any={};

  private destinataryList: Destinatary[] = [];

  private destinatarySubject = new Subject<Destinatary[]>();

  constructor(private router: Router, private http: HttpClient) {}

  getDestinatary() {
    console.log("customerId",sessionStorage.getItem('customerId'));
    this.http.get<Destinatary[]>(this.baseUrl + 'api/destinatary/'+this.customerId).subscribe((response) => {
      console.log("getDestinatary",response);
      this.data = response;
      const tempdata = this.data.data;
      this.destinataryList = tempdata;
      this.destinatarySubject.next([...this.destinataryList]);
    });

    return this.destinataryList.slice();
  }

  saveDestinatary(destinatary: Destinatary): any {
    console.log(destinatary);

    this.http.post(this.baseUrl + 'api/destinatary', destinatary)
      .subscribe((response) =>{
        this.destinatarySubject.next();
    });
  }

  getListener() {
    return this.destinatarySubject.asObservable();
  }

  makeDestintary(transfer: Destinatary) {

  }

}
