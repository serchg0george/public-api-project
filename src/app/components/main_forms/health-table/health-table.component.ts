import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { HealthService } from '../../../services/health-service/health.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HealthSearch } from '../../../interfaces/healthsearch.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'health-table',
  templateUrl: './health-table.component.html',
  styleUrl: './health-table.component.css'
})
export class HealthTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['status', 'updateDate', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public searchHealthModel: HealthSearch = { status: '' }

  constructor(private service: HealthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData(0, 10);
  }

  fetchData(pageNo: number, pageSize: number): void {
    this.service.getHealth(pageNo, pageSize).subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  searchHealth() {
    if (!this.searchHealthModel.status) {
      this.fetchData(0, 10);
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
    this.router.navigate(['/edit-health', { health: JSON.stringify(health) }]);
  }

  onPageChange(event: PageEvent) {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  deleteHealth(id: number): void {
    this.service.deleteHealth(id).subscribe(() => {
      console.log('Health deleted');
      this.fetchData(0, 10);
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
