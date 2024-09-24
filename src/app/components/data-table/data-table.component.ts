import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/cage-service/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cage } from '../../interfaces/cage.model';
import { Router } from '@angular/router';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {

  public displayedColumns: string[] = ['cageNumber', 'availability', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public selectedCage: any = { id: null, cageNumber: '', availability: '' };
  public searchCageModel: Cage = { cageNumber: '', availability: '' }

  constructor(private service: DataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  searchCage() {
    if (!this.searchCageModel.cageNumber && !this.searchCageModel.availability) {
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
    this.selectedCage = { ...cage };
  }

  onSubmitEdit(): void {
    this.service.editData(this.selectedCage.id, this.selectedCage).subscribe((response) => {
      console.log('Item updated:', response);
      this.fetchData();
    });
  }

  deleteCage(id: number) {
    this.service.deleteData(id).subscribe(() => {
      console.log('Cage deleted');
      this.fetchData();
    });
  }

}
