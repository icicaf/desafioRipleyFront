import { Transfers } from "./transfer.model";
import { Subject } from "rxjs"
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferService{

  trasfersList: Transfers[] = [
    {name: "Cristian Aguayo", rut: "1226552-k", bank: "Banco Estado", type: "Cuenta corriente", ammount: 99999},
    {name: "Alex Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta corriente", ammount: 9232399},
    {name: "Cristian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta corriente", ammount: 999454599},
    {name: "Sebastian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta corriente", ammount: 23},
    {name: "Cristian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta corriente", ammount: 233232},
    {name: "Cristian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta corriente", ammount: 923232323399},
    {name: "Cristian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta vista", ammount: 99999},
    {name: "Sandra Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta corriente", ammount: 9232399},
    {name: "Cristian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta vista", ammount: 999454599},
    {name: "Cristian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta vista", ammount: 23},
    {name: "Cristian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta vista", ammount: 233232},
    {name: "Cristian Aguayo",  rut: "1226552-k", bank: "Banco Estado", type: "Cuenta corrivistaente", ammount: 923232323399}
  ];

  transferSubject = new Subject<Transfers>();

  getTransfers() {
    return this.trasfersList.slice();
  }

  saveTransfer(transfer: Transfers) {
    this.trasfersList.push(transfer);
    this.transferSubject.next(transfer);
  }

}
