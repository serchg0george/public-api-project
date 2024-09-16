import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/v1/cage'
  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addData(data: {cageNumber: string, availability: string}): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id)
  }

  editData(id: number, data: {id:number; cageNumber: string; availability: string}):
   Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, data);
  }
}
