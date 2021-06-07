import { Component, Input, EventEmitter, Output } from '@angular/core';
import { RecipientsService } from '../services/recipients.service'

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls : ['./recipient.component.css']
})

export class RecipientComponent {
  @Input() recipientName?:any;
  @Output() recipientClicked = new EventEmitter();

  constructor(private recipientsService: RecipientsService){};

  onClicked() {
    this.recipientsService.deleteRecipient(this.recipientName);
  }
}
