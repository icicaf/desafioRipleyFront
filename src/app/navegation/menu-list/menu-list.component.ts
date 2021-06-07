import { Component, OnInit,EventEmitter, Output, OnDestroy } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

export class MenuListComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();

  statusUser: boolean;
  userSubscription?: Subscription;

  constructor(private securityService: SecurityService) {
    this.statusUser = false;
   }

  ngOnInit(): void {
    this.securityService.securityChanged.subscribe(status => {
      this.statusUser = status;
    })
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  onCloseMenu() {
    this.menuToggle.emit();
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  logout() {
    this.securityService.logout();
  }
}
