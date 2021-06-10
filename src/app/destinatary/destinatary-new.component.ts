import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { DestinataryService } from './destinatary.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-destinatary-new',
  templateUrl: './destinatary-new.component.html'
})

export class DestinataryNewComponent {
  selectBank?: string;
  selectedBankText: string;

  selectTypeAccount: string;
  selectedTypeAccountText: string;

  customerId = sessionStorage.getItem('customerId');

  constructor(private destinataryService: DestinataryService, private dialogRef: MatDialog) {
    this.selectedTypeAccountText='';
    this.selectedBankText = '';
    this.selectTypeAccount = '';
  }

  selectedBank(event: MatSelectChange) {
    this.selectedBankText = (event.source.selected as MatOption).viewValue;
  }

  saveDestinatary(form: NgForm) {
    if(form.valid) {
      this.destinataryService.saveDestinatary({
        destinatary_id : '',
        destinatary_bank: this.selectedBankText,
        destinatary_mail: form.value.mail,
        destinatary_telephone: form.value.telephone,
        destinatary_name: form.value.name,
        destinatary_rut: form.value.rut,
        destinatary_typeAccount: this.selectedTypeAccountText,
        destinatary_numberAccount: form.value.numberAccount,
        customer_id: this.customerId,
        created_at: ''
      });
      this.dialogRef.closeAll()
    }
  }

  selectedTypeAccount(event: MatSelectChange) {
    this.selectedTypeAccountText = (event.source.selected as MatOption).viewValue;
  }
}
