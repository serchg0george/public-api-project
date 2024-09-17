import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/api/v1/role';
  constructor(private http: HttpClient) { }

  getRole(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addRole(role: {
    name: string,
    description: string
  }): Observable<any> {
    return this.http.post(this.apiUrl, role);
  }

  editRole(id: number, role: {
    name: string,
    description: string
  }): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, role);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
