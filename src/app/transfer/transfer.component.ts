import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { TransferService } from './transfer.service';
import { Transfer } from './transfer.model'
import { MatTableDataSource} from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})

export class TransferComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) orderBy: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  transferData: Transfer[] = [];
  showColumns = ['name','rut','bank','type','created_at','ammount'];
  dataSource = new MatTableDataSource<Transfer>();

  private transferSubcriptions: Subscription;

  constructor(private transferService: TransferService, private dialog: MatDialog) {
    this.orderBy = new MatSort;
    this.transferSubcriptions = new Subscription;
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  ngOnInit(): void {
   this.transferData = this.transferService.getTransfers();
   this.transferSubcriptions = this.transferService.getListener()
    .subscribe((transfers: Transfer[]) => {
     this.dataSource.data = transfers;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.orderBy;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.transferSubcriptions.unsubscribe();
  }
}
