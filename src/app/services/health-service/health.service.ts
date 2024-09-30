import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Health } from '../../interfaces/health.model';
import { HealthSearch } from '../../interfaces/healthsearch.model';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private apiUrl = 'http://localhost:8080/api/v1/health'
  constructor(private http: HttpClient) { }

  searchHealth(health: HealthSearch): Observable<any> {
    return this.http.post(this.apiUrl + "/search", health);
  }

  getHealth(pageNo: number, pageSize: number): Observable<Health[]> {
    return this.http.get<Health[]>(`${this.apiUrl}?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  addHealth(health: Health): Observable<any> {
    return this.http.post(this.apiUrl, health);
  }

  editHealth(id: number, health: Health):
    Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, health);
  }

  deleteHealth(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + id);
  }

}
