import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RecipientNewComponent } from '../../recipients/recipient-new.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();

  statusUser: boolean;
  userSubscription?: Subscription;

  constructor(private securityService: SecurityService, private dialog: MatDialog) {
    this.statusUser=false;
  }

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
    this.dialog.open(RecipientNewComponent,{
      width:'60%'
    });
  }
}
