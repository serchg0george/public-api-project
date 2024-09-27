import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/cage-service/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CageSearch } from '../../../interfaces/cagesearch.model';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {

  public displayedColumns: string[] = ['cageNumber', 'availability', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public searchCageModel: CageSearch = { query: '' }

  constructor(private service: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  searchCage() {
    if (!this.searchCageModel.query) {
      this.fetchData();
    } else {
      this.service.searchCage(this.searchCageModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }

  }

  fetchData(): void {
    this.service.getData().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  navigateToAddCage() {
    this.router.navigate(['/add-cage'])
  }

  editCage(cage: any) {
    this.router.navigate(['/edit-cage', { cage: JSON.stringify(cage) }]);
  }

  deleteCage(id: number) {
    this.service.deleteData(id).subscribe(() => {
      console.log('Cage deleted');
      this.fetchData();
    });
  }

}
