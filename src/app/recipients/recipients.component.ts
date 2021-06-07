import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipientsService } from '../services/recipients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls : ['./recipients.component.css']
})

export class RecipientsComponent implements OnInit, OnDestroy {
  recipients:any = [];
  constructor(private recipientsService: RecipientsService) { }
  private recipientsSubcription:any = Subscription;

  deleteRecipient(recipient:any) {
  }

  saveRecipient(f:any) {
    if(f.valid) {
      this.recipientsService.createRecipient(f.value.recipientName);
    }
  }

  ngOnInit() {
    this.recipients = this.recipientsService.getRecipients();
    this.recipientsSubcription = this.recipientsService.recipientsSubject.subscribe(() => {
      this.recipients = this.recipientsService.getRecipients();
    });
  }

  ngOnDestroy() {
    this.recipientsSubcription.unsubscribe();
  }
}
