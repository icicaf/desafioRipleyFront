import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TransferService } from './transfer.service';
import { Transfers } from './transfer.model'
import { MatTableDataSource} from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit, AfterViewInit {
  transferData: Transfers[] = [];
  showColumns = ['name','rut','bank','type','ammount'];
  dataSource = new MatTableDataSource<Transfers>();
  @ViewChild(MatSort) orderBy: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private TransferService: TransferService, private dialog: MatDialog) {
    this.orderBy = new MatSort;
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  ngOnInit(): void {
    this.dataSource.data = this.TransferService.getTransfers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.orderBy;
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    //this.dialog.open();
  }

}
