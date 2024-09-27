import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal-service/animal.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Animal } from '../../interfaces/animal.model';
import { AnimalSearch } from '../../interfaces/animalsearch.model';
import { Router } from '@angular/router';

@Component({
  selector: 'animal-table',
  templateUrl: './animal-table.component.html',
  styleUrl: './animal-table.component.css'
})
export class AnimalTableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'species', 'age', 'cage', 'health', 'actions'];
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
    query: ''
  }

  constructor(private animalService: AnimalService, private router: Router) { }

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.animalService.getAnimals().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  searchAnimal() {
    if (!this.searchAnimalModel.query) {
      this.fetchAnimals();
    } else {
      this.animalService.searchAnimal(this.searchAnimalModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  navigateToAddAnimal() {
    this.router.navigate(['/add-animal']);
  }

  // updateAnimal(): void {
  //   if (this.selectedAnimal) {
  //     const updatedAnimal = {
  //       id: this.selectedAnimal.id,
  //       name: this.animalForm.get('name')?.value,
  //       species: this.animalForm.get('species')?.value,
  //       age: this.animalForm.get('age')?.value,
  //       cage: { cageNumber: this.animalForm.get('cage')?.value },
  //       health: { status: this.animalForm.get('health')?.value }
  //     } as Animal;

  //     this.animalService.editAnimal(this.selectedAnimal.id, updatedAnimal).subscribe((response) => {
  //       console.log('Animal updated:', response);
  //       this.fetchAnimals(); 
  //       this.selectedAnimal = null;
  //       this.animalForm.reset();
  //     });
  //   }

  // }

  editAnimal(animal: Animal): void {
    this.router.navigate(['/edit-animal', animal.id]);
    // this.selectedAnimal = { ...animal };
    // this.animalForm.patchValue({
    //   name: animal.name,
    //   species: animal.species,
    //   age: animal.age,
    //   cage: animal.cage.cageNumber,
    //   health: animal.health.status
    // });
    // this.fetchAnimals();
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