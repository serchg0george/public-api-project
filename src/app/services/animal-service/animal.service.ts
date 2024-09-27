import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../../interfaces/animal.model';
import { AnimalSearch } from '../../interfaces/animalsearch.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'http://localhost:8080/api/v1/animal';

  constructor(private http: HttpClient) { }

  searchAnimal(animal: AnimalSearch): Observable<any> {
    return this.http.post(this.apiUrl + "/search", animal);
  }

  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }

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
