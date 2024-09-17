import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role-service/role.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.css'
})
export class RoleTableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'description', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public selectedRole: any = { id: null, name: '', description: '' };
  public newRole: any = { name: '', description: '' };

  constructor(private service: RoleService) { };

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const lowerCaseFilter = filter.trim().toLowerCase();
      return data.name.toLowerCase().includes(lowerCaseFilter)
        || data.description.toLowerCase().includes(lowerCaseFilter)
    };
    this.fetchData();
  }

  fetchData(): void {
    this.service.getRole().subscribe((response) => {
      this.dataSource.data = response;
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addRole(): void {
    const newRoleData = { ...this.newRole };
    this.service.addRole(newRoleData).subscribe((response) => {
      console.log('New role added', response);
      this.newRole = { name: '', description: '' };
    });
    this.fetchData();
    this.reloadPage();
  }

  editRole(role: any): void {
    this.selectedRole = { ...role };
  }

  onSubmitEdit(): void {
    this.service.editRole(this.selectedRole.id, this.selectedRole).subscribe((response) => {
      console.log('Role updated:', response);
      this.selectedRole = { id: null, name: '', description: '' };
    });
    this.fetchData();
    this.reloadPage();
  }

  deleteRole(id: number): void {
    this.service.deleteRole(id).subscribe(() => {
      console.log('Role deleted');
    });
    this.reloadPage();
  }
  reloadPage() {
    window.location.reload();
  }
}
