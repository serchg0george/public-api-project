import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Animal {
  id: number,
  name: string;
  species: string;
  age: number;
  cage: {
    id: number;
    cageNumber: string;
  };
  health: {
    id: number;
    status: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'http://localhost:8080/api/v1/animal';

  constructor(private http: HttpClient) { }

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal);
  }

  editAnimal(id: number, animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(this.apiUrl+ '/' + id, animal);
  }

  deleteAnimal(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}
