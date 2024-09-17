import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/cage-service/data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {

  public displayedColumns: string[] = ['cageNumber', 'availability', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public selectedCage: any = { id: null, cageNumber: '', availability: '' };
  public newCage: any = { cageNumber: '', availability: '' };
  
  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.fetchData();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      return data.cageNumber.toLowerCase().includes(filterValue) || 
             data.availability.toLowerCase().includes(filterValue);
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchData(): void {
    this.service.getData().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  addCage(): void {
    const newCageData = { ...this.newCage };
    this.service.addData(newCageData).subscribe((response) => {
      console.log('New cage added:', response);
      this.newCage = { cageNumber: '', availability: '' };
      this.fetchData();
    });
    this.fetchData();
    this.reloadPage();
  }

  editCage(cage: any) {
    this.selectedCage = { ...cage };
    this.fetchData();
    this.reloadPage();
  }

  onSubmitEdit(): void {
    this.service.editData(this.selectedCage.id, this.selectedCage).subscribe((response) => {
      console.log('Item updated:', response);
      this.fetchData();
    });
    this.fetchData();
    this.reloadPage();
  }

  deleteCage(id: number) {
    this.service.deleteData(id).subscribe(() => {
      console.log('Cage deleted');
      this.fetchData();
    });
    this.fetchData();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }
}
