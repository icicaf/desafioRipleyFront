import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TransferComponent } from '../../transfer/transfer.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();

  statusUser?: boolean;
  userSubscription?: Subscription;

  constructor(private securityService: SecurityService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.securityService.securityChanged.subscribe(status => {
      this.statusUser = status;
    })
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  logout() {
    this.securityService.logout();
  }

  openDialog() {
    // this.dialog.open(RecipientNewComponent,{
    //   width:'40%'
   //  });
   }
}
