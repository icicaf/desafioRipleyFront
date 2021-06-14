import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DestinataryService } from './destinatary.service';
import { Destinatary } from './destinatary.model'
import { MatTableDataSource} from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DestinataryNewComponent } from './destinatary-new.component';

@Component({
  selector: 'app-destinatary',
  templateUrl: './destinatary.component.html',
  styleUrls: ['./destinatary.component.css']
})
export class DestinataryComponent implements OnInit, AfterViewInit ,OnDestroy {
  destinataryData: Destinatary[] = [];
  showColumns = ['rut','name','mail','telephone','bank','typeAccount','numberAccount'];
  dataSource = new MatTableDataSource<Destinatary>();

  @ViewChild(MatSort) orderBy: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  private destinatarySubcriptions: Subscription;

  constructor(private destinataryService: DestinataryService, private dialog: MatDialog) {
    this.orderBy = new MatSort;
    this.destinatarySubcriptions = new Subscription;
  }

  doFilter(filter: string) {
    this.dataSource.filter = filter;
  }

  ngOnInit(): void {
   this.destinataryService.getDestinatary();
   this.destinatarySubcriptions = this.destinataryService.getListener().subscribe( (destinatary: Destinatary[])=>{this.dataSource.data = destinatary;
   })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.orderBy;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.destinatarySubcriptions.unsubscribe();
  }

  openDialog(){
    this.dialog.open(DestinataryNewComponent, {
      width: '40%',
    });
  }

}
