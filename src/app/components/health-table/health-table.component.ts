import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../services/health-service/health.service';
import { MatTableDataSource } from '@angular/material/table';
import { Health } from '../../interfaces/health.model';
import { Router } from '@angular/router';
import { HealthSearch } from '../../interfaces/healthsearch.model';
@Component({
  selector: 'health-table',
  templateUrl: './health-table.component.html',
  styleUrl: './health-table.component.css'
})
export class HealthTableComponent implements OnInit {
  public displayedColumns: string[] = ['status', 'updateDate', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public selectedHealth: any = { id: null, healthStatus: '' };
  public searchHealthModel: HealthSearch = { status: '' }

  constructor(private service: HealthService, private router: Router) { }

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

  navigateToAddHealth() {
    this.router.navigate(['/add-health']);
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
