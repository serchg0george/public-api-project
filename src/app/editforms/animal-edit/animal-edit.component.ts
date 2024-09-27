import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../services/animal-service/animal.service';
import { Animal } from '../../interfaces/animal.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrl: './animal-edit.component.css'
})
export class AnimalEditComponent implements OnInit {
  @Input() animal: Animal | null = null;
  
  animalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    species: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    cage: new FormControl('', Validators.required),
    health: new FormControl('', Validators.required),
  });

  constructor(private animalService: AnimalService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('id');
    if (animalId) {
      this.animalService.getAnimalById(+animalId).subscribe((animal) => {
        this.animal = animal;
        this.populateForm(animal);
      });
    }
  }

  populateForm(animal: Animal): void {
    this.animalForm.patchValue({
      name: animal.name,
      species: animal.species,
      age: animal.age,
      cage: animal.cage.cageNumber,
      health: animal.health.status,
    });
  }

  updateAnimal(): void {
    if (this.animal) {
      const updatedAnimal = {
        id: this.animal.id,
        name: this.animalForm.get('name')?.value,
        species: this.animalForm.get('species')?.value,
        age: this.animalForm.get('age')?.value,
        cage: { cageNumber: this.animalForm.get('cage')?.value },
        health: { status: this.animalForm.get('health')?.value },
      } as Animal;

      this.animalService.editAnimal(this.animal.id, updatedAnimal).subscribe((response) => {
        console.log('Animal updated:', response);
        this.router.navigate(['/animal']);
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/animal']);
  }
}
