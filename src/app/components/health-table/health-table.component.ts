import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../services/health-service/health.service';
import { MatTableDataSource } from '@angular/material/table';
import { Health } from '../../interfaces/health.model';
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
  public searchHealthModel: Health = { status: '' }

  constructor(private service: HealthService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.service.getHealth().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  searchHealth() {
    if (!this.searchHealthModel.status) {
      this.fetchData();
    } else {
      this.service.searchHealth(this.searchHealthModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }

  }

  addHealth(): void {
    const newHealthData = { ...this.newHealth };
    this.service.addHealth(newHealthData).subscribe((response) => {
      console.log('New health added:', response);
      this.newHealth = { status: '' };
      this.fetchData();
    });
  }

  editHealth(health: any): void {
    this.selectedHealth = { ...health };
  }

  onSubmitEdit(): void {
    this.service.editHealth(this.selectedHealth.id, this.selectedHealth).subscribe((response) => {
      console.log('Health updated:', response);
      this.selectedHealth = { id: null, healthStatus: '' };
      this.fetchData();
    });
  }

  deleteHealth(id: number): void {
    this.service.deleteHealth(id).subscribe(() => {
      console.log('Health deleted');
      this.fetchData();
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
