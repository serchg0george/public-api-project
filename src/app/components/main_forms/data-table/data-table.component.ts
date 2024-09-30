import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../../../services/cage-service/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CageSearch } from '../../../interfaces/cagesearch.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['cageNumber', 'availability', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public searchCageModel: CageSearch = { query: '' }

  constructor(private service: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData(0, 10);
  }

  searchCage() {
    if (!this.searchCageModel.query) {
      this.fetchData(0, 10);
    } else {
      this.service.searchCage(this.searchCageModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }

  }

  fetchData(pageNo: number, pageSize: number): void {
    this.service.getData(pageNo, pageSize).subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  navigateToAddCage() {
    this.router.navigate(['/add-cage'])
  }

  editCage(cage: any) {
    this.router.navigate(['/edit-cage', { cage: JSON.stringify(cage) }]);
  }

  onChangeEvent(event: PageEvent) {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  deleteCage(id: number) {
    this.service.deleteData(id).subscribe(() => {
      console.log('Cage deleted');
      this.fetchData(0, 10);
    });
  }

}
