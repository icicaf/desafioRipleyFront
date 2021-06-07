import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { RecipientsService } from './recipients.service';

@Component({
  selector: 'app-recipient-new',
  templateUrl: './recipient-new.component.html'
})

export class RecipientNewComponent {
  selectBank?: string;
  selectedBankText?: string;
  selectTypeAccount?: string;

  constructor(recipientsService: RecipientsService) {}

  selectedBank(event: MatSelectChange) {
    this.selectedBankText = (event.source.selected as MatOption).viewValue;
  }

  saveRecipient(form: NgForm) {

  }
}
