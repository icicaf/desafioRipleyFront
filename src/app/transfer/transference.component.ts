import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { Destinatary } from '../destinatary/destinatary.model';
import { DestinataryService } from '../destinatary/destinatary.service';

@Component({
  selector: 'app-transference',
  templateUrl: './transference.component.html',
})

export class TransferenceComponent implements OnInit {
  selectDestinatary?: string;
  selectedDestinataryText = '';
  customerId = sessionStorage.getItem('customerId');

  recipients: Destinatary[] = [];

  constructor(private destinataryService: DestinataryService) {
    this.selectDestinatary='';
    this.selectedDestinataryText = '';
  }

  ngOnInit() {
    this.recipients = this.destinataryService.getDestinatary();
  }

  selectedDestinatary(event: MatSelectChange) {
    this.selectedDestinataryText = (event.source.selected as MatOption).viewValue;
  }

  saveDestinatary(form: NgForm) {
    console.log("transferencia");
    if(form.valid) {
      this.destinataryService.saveDestinatary({
        destinatary_id : '',
        destinatary_bank: '',
        destinatary_mail: form.value.mail,
        destinatary_telephone: form.value.telephone,
        destinatary_name: form.value.name,
        destinatary_rut: form.value.rut,
        destinatary_typeAccount: '',
        destinatary_numberAccount: form.value.numberAccount,
        customer_id: this.customerId,
        created_at: ''
      });
    }
  }

}
