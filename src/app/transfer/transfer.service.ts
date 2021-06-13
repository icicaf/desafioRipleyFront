import { Transfer } from './transfer.model'
import { Subject } from "rxjs"
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import  Swal from 'sweetalert2'

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
    const validate = this.validateData(transference);
    if(validate) {
      this.http
        .post<any>(this.baseUrl + 'api/transfer', transference)
        .subscribe((response) => {
          this.data = response;
          if(this.data.transfer) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Transferencia realizada',
              showConfirmButton: false,
              timer: 1500
            })
          } else {

          }
          console.log(this.data)
      });
    } else {}
  }

  validateData(transference: Transfer) {
    if(transference.customer_id > 0 && transference.transfer_bankDestinatary !== ''
        && transference.transfer_nameDestinatary !== ''  && transference.transfer_rutDestinatary !== ''
        && transference.transfer_totalAmountDestinatary > 0 && transference.transfer_typeAccountDestinatary !== '') {
        return true;
    } else {
      return false;
    }
  }

  getListener() {
    return this.transfersSubject.asObservable();
  }

}
