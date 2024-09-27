import { Component } from '@angular/core';
import { User } from '../../../interfaces/user.model';
import { UserService } from '../../../services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  public newUser: User = { email: '', password: '', firstName: '', lastName: '', phoneNumber: '' };

  constructor(private service: UserService, private router: Router) {}

  addUser(): void {
    const newUserData = { ...this.newUser };
    this.service.addUser(newUserData).subscribe((response) => {
      console.log('New user added:', response);
      this.newUser = { email: '', password: '', firstName: '', lastName: '', phoneNumber: '' }
      this.navigateToUserTable();
    });
  }

  navigateToUserTable() {
    this.router.navigate(['/user']);
  }
}
