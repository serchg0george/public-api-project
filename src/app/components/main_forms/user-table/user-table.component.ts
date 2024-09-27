import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../../services/user-service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserSearch } from '../../../interfaces/usersearch.model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public searchUserModel: UserSearch = {
    query: ''
  }

  constructor(private service: UserService, private router: Router) { };

  ngOnInit(): void {
    this.fetchData(0, 10);
  }

  fetchData(pageNo: number, pageSize: number): void {
    this.service.getUser(pageNo, pageSize).subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  searchUser() {
    if (!this.searchUserModel.query) {
      this.fetchData(0, 10);
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

  onPageChange(event: PageEvent) {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  deleteUser(id: number): void {
    this.service.deleteUser(id).subscribe(() => {
      console.log('User deleted');
      this.fetchData(0, 10);
    });
  }

}
