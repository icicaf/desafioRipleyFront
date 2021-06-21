import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Destinatary } from '../destinatary/destinatary.model';
import { DestinataryService } from '../destinatary/destinatary.service';
import { TransferService } from './transfer.service';
import  Swal from 'sweetalert2'
@Component({
  selector: 'app-transference',
  templateUrl: './transference.component.html',
})

export class TransferenceComponent implements OnInit {
  selectDestinatary?: string;
  selectedDestinataryText = '';
  customerId = sessionStorage.getItem('customerId');

  destinatary_rut: string = '';
  destinatary_name: string = '';
  destinatary_mail: string = '';
  destinatary_bank: string = '';
  destinatary_typeAccount: string = '';
  destinatary_numberAccount: string = '';
  created_at: string = '';

  recipients: Destinatary[] = [];

  constructor(private destinataryService: DestinataryService, private transferService: TransferService) {
    this.selectDestinatary='';
    this.selectedDestinataryText = '';
  }

  ngOnInit() {
    this.destinataryService.getRecipient().subscribe( result => {
      this.recipients = result.data;
    });

    if(this.recipients) {
      Swal.fire({
        title: '<strong>Advertencia</strong>',
        icon: 'info',
        html: 'No tienes ningun destinatario en tu lista, por favor registra uno para continuar',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Ir a crear destinatario',
      }).then((result) => {
        if (result.isConfirmed) {
          this.destinataryService.goToDestinatary();
        }
      })
    }
  }

  selectedDestinatary(event:any) {
    this.selectedDestinataryText = (event.source.selected).value;
    const id = (event.source.selected).value;
    for(let i = 0; i < this.recipients.length; i++) {
      if( id == this.recipients[i].destinatary_id) {
        this.destinatary_rut = this.recipients[i].destinatary_rut;
        this.destinatary_name = this.recipients[i].destinatary_name;
        this.destinatary_mail = this.recipients[i].destinatary_mail;
        this.destinatary_bank = this.recipients[i].destinatary_bank;
        this.destinatary_typeAccount = this.recipients[i].destinatary_typeAccount;
        this.destinatary_rut = this.recipients[i].destinatary_rut;
        this.created_at = this.recipients[i].created_at;
        this.destinatary_numberAccount = this.recipients[i].destinatary_numberAccount;
      }
    }
  }

  saveTransfer(form: NgForm) {
    if(form.valid) {
      this.transferService.makeTransfer({
        customer_id: Number(this.customerId),
        transfer_bankDestinatary: this.destinatary_bank,
        transfer_nameDestinatary: this.destinatary_name,
        transfer_rutDestinatary: this.destinatary_rut,
        transfer_totalAmountDestinatary: form.value.ammount,
        transfer_typeAccountDestinatary: this.destinatary_typeAccount,
        created_at: ''
      });
      this.destinatary_rut = '';
      this.destinatary_name = '';
      this.destinatary_mail = '';
      this.destinatary_bank = '';
      this.destinatary_typeAccount = '';
      this.destinatary_rut = '';
      this.created_at = '';
      this.destinatary_numberAccount = '';
      form.reset();
    }
  }

}
