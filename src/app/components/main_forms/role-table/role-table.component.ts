import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { RoleService } from '../../../services/role-service/role.service';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../../../interfaces/role.model';
import { Router } from '@angular/router';
import { RoleSearch } from '../../../interfaces/rolesearch.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.css'
})
export class RoleTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['name', 'description', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public newRole: Role = { name: '', description: '' };
  public searchRoleModel: RoleSearch = { query: '' };

  constructor(private service: RoleService, private router: Router) { };

  ngOnInit(): void {
    this.fetchData(0, 10);
  }

  fetchData(pageNo: number, pageSize: number): void {
    this.service.getRole(pageNo, pageSize).subscribe((response) => {
      this.dataSource.data = response;
    })
  }

  searchRole() {
    if (!this.searchRoleModel.query) {
      this.fetchData(0, 10);
    } else {
      this.service.searchRole(this.searchRoleModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  navigateToAddRole() {
    this.router.navigate(['/add-role'])
  }

  editRole(role: any): void {
    this.router.navigate(['/edit-role', { role: JSON.stringify(role) }])
  }

  onPageChange(event: PageEvent) {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  deleteRole(id: number): void {
    this.service.deleteRole(id).subscribe(() => {
      console.log('Role deleted');
      this.fetchData(0, 10);
    });
  }

}
