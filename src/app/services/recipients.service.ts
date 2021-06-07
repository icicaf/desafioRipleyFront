import { Subject } from "rxjs";
export class RecipientsService {
  recipientsSubject = new Subject();

  private recipients = [
    'Destinatario 1',
    'Destinatario 2',
    'Destinatario 3'
  ];

  createRecipient(recipientName: string) {
    this.recipients.push(recipientName);
    this.recipientsSubject.next();
  }

  deleteRecipient(recipientName: string) {
    this.recipients = this.recipients.filter( x => x !== recipientName);
    this.recipientsSubject.next();
  }

  getRecipients() {
    return [...this.recipients];
  }
}
