import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserSearch } from '../../interfaces/usersearch.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  public displayedColumns: string[] = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public searchUserModel: UserSearch = {
    query: ''
  }

  constructor(private service: UserService, private router: Router) { };

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.service.getUser().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  searchUser() {
    if (!this.searchUserModel.query) {
      this.fetchData();
    } else {
      this.service.searchUser(this.searchUserModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  navigateToAddUser() {
    this.router.navigate(['/add-user']);
  }

  editUser(user: any): void {
    this.router.navigate(['/edit-user', { user: JSON.stringify(user) }])
  }

  deleteUser(id: number): void {
    this.service.deleteUser(id).subscribe(() => {
      console.log('User deleted');
      this.fetchData();
    });
  }

}
