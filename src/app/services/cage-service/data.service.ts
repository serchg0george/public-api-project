import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cage } from '../../interfaces/cage.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/v1/cage'
  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  searchCage(cage: Cage): Observable<any> {
    return this.http.post(this.apiUrl + "/search", cage);
  }

  addData(cage: Cage): Observable<any> {
    return this.http.post(this.apiUrl, cage);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id)
  }

  editData(id: number, cage: Cage):
    Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, cage);
  }
}
