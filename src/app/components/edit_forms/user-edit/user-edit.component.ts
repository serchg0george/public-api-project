import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  public user: any = {
    id: null, email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['user']) {
        this.user = JSON.parse(params['user']);
      }
    });
  }

  onSubmitEdit(): void {
    this.service.editUser(this.user.id, this.user).subscribe((response) => {
      console.log('User updated:', response);
      this.router.navigate(['/user']);
    });
  }

}
