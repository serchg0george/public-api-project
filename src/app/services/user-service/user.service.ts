import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../../interfaces/user.model'
import { UserSearch } from '../../interfaces/usersearch.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user';
  constructor(private http: HttpClient) { }

  searchUser(user: UserSearch): Observable<any> {
    return this.http.post(this.apiUrl + "/search", user);
  }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  editUser(id: number, user: User): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
