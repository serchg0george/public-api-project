import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../services/health-service/health.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'health-table',
  templateUrl: './health-table.component.html',
  styleUrl: './health-table.component.css'
})
export class HealthTableComponent implements OnInit {
  public displayedColumns: string[] = ['status', 'updateDate', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public selectedHealth: any = { id: null, healthStatus: '' };
  public newHealth: any = { status: '' };

  constructor(private service: HealthService) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.status.toLowerCase().includes(filter);
    };
    this.fetchData();
  }

  fetchData(): void {
    this.service.getHealth().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addHealth(): void {
    const newHealthData = { ...this.newHealth };
    this.service.addHealth(newHealthData).subscribe((response) => {
      console.log('New health added:', response);
      this.newHealth = { status: '' };
    });
    this.fetchData();
    this.reloadPage();
  }

  editHealth(health: any): void {
    this.selectedHealth = { ...health };
  }

  onSubmitEdit(): void {
    this.service.editHealth(this.selectedHealth.id, this.selectedHealth).subscribe((response) => {
      console.log('Health updated:', response);
      this.selectedHealth = { id: null, healthStatus: '' };
    });
    this.fetchData();
    this.reloadPage();
  }

  deleteHealth(id: number): void {
    this.service.deleteHealth(id).subscribe(() => {
      console.log('Health deleted');
    });
    this.fetchData();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }
}
