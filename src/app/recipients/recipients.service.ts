import { Recipients } from "./recipients.model";
import { Subject } from "rxjs"


export class RecipientsService{

  private recipientsList: Recipients[] = [
    {rut: "1226552-k", name: "Cristian Aguayo", mail:"icicaf@gmail.com", telephone: "979295142", bank: "Banco Estado", typeAccount: "Cuenta corriente", numberAcoount: 99999},
  ];

  recipientSubject = new Subject<Recipients>();

  getRecipients() {
    return this.recipientsList.slice();
  }

  saveRecipient(recipient: Recipients) {
    this.recipientsList.push(recipient);
    this.recipientSubject.next(recipient);
  }

}
