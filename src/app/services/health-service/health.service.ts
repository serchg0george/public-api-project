import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private apiUrl = 'http://localhost:8080/api/v1/health'
  constructor(private http: HttpClient) { }

  getHealth(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addHealth(health: { status: string }): Observable<any> {
    return this.http.post(this.apiUrl, health);
  }

  editHealth(id: number, health: { id: number; status: string }):
    Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, health);
  }

  deleteHealth(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + id);
  }

}
