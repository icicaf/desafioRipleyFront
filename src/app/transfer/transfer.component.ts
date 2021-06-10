import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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

export class TransferComponent implements OnInit, OnDestroy {
  transferData: Transfer[] = [];
  showColumns = ['name','rut','bank','type','ammount'];
  dataSource = new MatTableDataSource<Transfer>();
  @ViewChild(MatSort) orderBy: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  private transferSubcriptions?: Subscription;

  constructor(private transferService: TransferService, private dialog: MatDialog) {
    this.orderBy = new MatSort;
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  ngOnInit(): void {
   this.transferService.getTransfers();
   this.transferSubcriptions = this.transferService.getListener().subscribe( (transfers: Transfer[])=>{
    this.dataSource.data = transfers;
   })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.orderBy;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.transferSubcriptions?.unsubscribe();
  }

  openDialog() {
    //this.dialog.open();
  }

}
