import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Animal } from '../../../interfaces/animal.model';
import { Router } from '@angular/router';
import { AnimalService } from '../../../services/animal-service/animal.service';
@Component({
  selector: 'app-animal-add',
  templateUrl: './animal-add.component.html',
  styleUrl: './animal-add.component.css'
})
export class AnimalAddComponent {

  animalForm = new FormGroup({
    name: new FormControl(''),
    species: new FormControl(''),
    age: new FormControl(0),
    cage: new FormControl(''),
    health: new FormControl('')
  });

  constructor(private animalService: AnimalService, private router: Router) {}

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
      this.animalForm.reset();
      this.navigateToAnimal();
    });
  }

  navigateToAnimal() {
    this.router.navigate(['/animal']);
  }
}
