import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role-service/role.service';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from '../../interfaces/role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.css'
})
export class RoleTableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public selectedRole: any = { id: null, name: '', description: '' };
  public newRole: Role = { name: '', description: '' };
  public searchRoleModel: Role = { name: '', description: '' };

  constructor(private service: RoleService, private router: Router) { };

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.service.getRole().subscribe((response) => {
      this.dataSource.data = response;
    })
  }

  searchRole() {
    if (!this.searchRoleModel.name && !this.searchRoleModel.description) {
      this.fetchData();
    } else {
      this.service.searchRole(this.searchRoleModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  // addRole(): void {
  //   const newRoleData = { ...this.newRole };
  //   this.service.addRole(newRoleData).subscribe((response) => {
  //     console.log('New role added', response);
  //     this.newRole = { name: '', description: '' };
  //     this.fetchData();
  //   });
  // }

  navigateToAddRole() {
    this.router.navigate(['/add-role'])
  }

  editRole(role: any): void {
    this.selectedRole = { ...role };
  }

  onSubmitEdit(): void {
    this.service.editRole(this.selectedRole.id, this.selectedRole).subscribe((response) => {
      console.log('Role updated:', response);
      this.selectedRole = { id: null, name: '', description: '' };
      this.fetchData();
    });
  }

  deleteRole(id: number): void {
    this.service.deleteRole(id).subscribe(() => {
      console.log('Role deleted');
      this.fetchData();
    });
  }

}
