import { Component } from '@angular/core';
import { RoleService } from '../../../services/role-service/role.service';
import { Role } from '../../../interfaces/role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrl: './role-add.component.css'
})
export class RoleAddComponent {
  public newRole: Role = { name: '', description: '' };

  constructor(private service: RoleService, private router: Router) { }

  addRole(): void {
    const newRoleData = { ...this.newRole };
    this.service.addRole(newRoleData).subscribe((response) => {
      console.log('New role added', response);
      this.newRole = { name: '', description: '' };
      this.navigateToRoleTable();
    });
  }

  navigateToRoleTable() {
    this.router.navigate(['/role']);
  }


}
