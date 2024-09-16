import { Component, OnInit } from '@angular/core';
import { AnimalService, Animal } from '../../services/animal-service/animal.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.fetchAnimals();
    this.dataSource.filterPredicate = (data: Animal, filter: string) => {
      const lowerCaseFilter = filter.trim().toLowerCase();
      return data.name.toLowerCase().includes(lowerCaseFilter)
        || data.species.toLowerCase().includes(lowerCaseFilter)
        || data.cage.cageNumber.toLowerCase().includes(lowerCaseFilter)
        || data.health.status.toLowerCase().includes(lowerCaseFilter);
    };
  }

  fetchAnimals(): void {
    this.animalService.getAnimals().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    this.animalForm.reset();
    this.fetchAnimals();
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
        this.fetchAnimals();  // Refresh the table
        this.selectedAnimal = null;
        this.animalForm.reset();
      });
      this.fetchAnimals();
    }
    this.fetchAnimals();
  }

  deleteAnimal(id: number): void {
    this.animalService.deleteAnimal(id).subscribe(() => {
      console.log('Animal deleted');
      this.fetchAnimals();  // Refresh the table
    });
    this.fetchAnimals();
  }

  // Reset form and selection
  resetForm(): void {
    this.selectedAnimal = null;
    this.animalForm.reset();
  }
}