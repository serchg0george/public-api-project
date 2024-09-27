import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role-service/role.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.css'
})
export class RoleEditComponent implements OnInit {
public role: any = { id: null, name: '', description: '' };

constructor(private route: ActivatedRoute, private service: RoleService, private router: Router) {}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    if (params['role']) {
      this.role = JSON.parse(params['role'])
    }
  });
}

onSubmitEdit(): void {
  this.service.editRole(this.role.id, this.role).subscribe((response) => {
    console.log('Role updated:', response);
    this.router.navigate(['/role'])
  });
}

}
