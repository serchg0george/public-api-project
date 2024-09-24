import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserSearch } from '../../interfaces/usersearch.model';
import { response } from 'express';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  public displayedColumns: string[] = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public selectedUser: any = { id: null, email: '', password: '', firstName: '', lastName: '', phoneNumber: '' };
  public newUser: any = { email: '', password: '', firstName: '', lastName: '', phoneNumber: '' };
  public searchUserModel: UserSearch = {
    email: '',
    phoneNumber: ''
  }

  constructor(private service: UserService) { };

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.service.getUser().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  searchUser() {
    if (!this.searchUserModel.email && !this.searchUserModel.phoneNumber) {
      this.fetchData();
    } else {
      this.service.searchUser(this.searchUserModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  addUser(): void {
    const newUserData = { ...this.newUser };
    this.service.addUser(newUserData).subscribe((response) => {
      console.log('New user added:', response);
      this.newUser = { email: '', password: '', firstName: '', lastName: '', phoneNumber: '' }
      this.fetchData();
    });
  }

  editUser(user: any): void {
    this.selectedUser = { ...user };
  }

  onSubmitEdit(): void {
    this.service.editUser(this.selectedUser.id, this.selectedUser).subscribe((response) => {
      console.log('User updated:', response);
      this.selectedUser = { id: null, email: '', password: '', firstName: '', lastName: '', phoneNumber: '' };
      this.fetchData();
    });
  }

  deleteUser(id: number): void {
    this.service.deleteUser(id).subscribe(() => {
      console.log('User deleted');
      this.fetchData();
    });
  }

}
