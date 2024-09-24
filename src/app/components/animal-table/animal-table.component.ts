import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal-service/animal.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { Animal } from '../../interfaces/animal.model';
import { AnimalSearch } from '../../interfaces/animalsearch.model';

@Component({
  selector: 'animal-table',
  templateUrl: './animal-table.component.html',
  styleUrl: './animal-table.component.css'
})
export class AnimalTableComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'species', 'age', 'cage', 'health', 'actions'];
  public dataSource = new MatTableDataSource<Animal>();
  public selectedAnimal: Animal | null = null;

  animalForm = new FormGroup({
    name: new FormControl(''),
    species: new FormControl(''),
    age: new FormControl(0),
    cage: new FormControl(''),
    health: new FormControl('')
  });

  public searchAnimalModel: AnimalSearch = {
    name: '',
    species: ''
  }

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.animalService.getAnimals().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  searchAnimal() {
    if (!this.searchAnimalModel.name && !this.searchAnimalModel.species) {
      this.fetchAnimals();
    } else {
      this.animalService.searchAnimal(this.searchAnimalModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  addAnimal(): void {
    const newAnimal = {
      name: this.animalForm.get('name')?.value,
      species: this.animalForm.get('species')?.value,
      age: this.animalForm.get('age')?.value,
      cage: { cageNumber: this.animalForm.get('cage')?.value },
      health: { status: this.animalForm.get('health')?.value }
    } as Partial<Animal>;

    this.animalService.addAnimal(newAnimal as Animal).subscribe((response) => {
      console.log('Animal added:', response);
      this.fetchAnimals();
      this.animalForm.reset();
    });
  }

  editAnimal(animal: Animal): void {
    this.selectedAnimal = { ...animal };
    this.animalForm.patchValue({
      name: animal.name,
      species: animal.species,
      age: animal.age,
      cage: animal.cage.cageNumber,
      health: animal.health.status
    });
    this.fetchAnimals();
  }

  updateAnimal(): void {
    if (this.selectedAnimal) {
      const updatedAnimal = {
        id: this.selectedAnimal.id,  // Keep the id for the update
        name: this.animalForm.get('name')?.value,
        species: this.animalForm.get('species')?.value,
        age: this.animalForm.get('age')?.value,
        cage: { cageNumber: this.animalForm.get('cage')?.value },
        health: { status: this.animalForm.get('health')?.value }
      } as Animal;

      this.animalService.editAnimal(this.selectedAnimal.id, updatedAnimal).subscribe((response) => {
        console.log('Animal updated:', response);
        this.fetchAnimals(); 
        this.selectedAnimal = null;
        this.animalForm.reset();
      });
    }

  }

  deleteAnimal(id: number): void {
    this.animalService.deleteAnimal(id).subscribe(() => {
      console.log('Animal deleted');
      this.fetchAnimals(); 
    });
  }

  resetForm(): void {
    this.selectedAnimal = null;
    this.animalForm.reset();
  }

}