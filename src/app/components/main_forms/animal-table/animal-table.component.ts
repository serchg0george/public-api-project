import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AnimalService } from '../../../services/animal-service/animal.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { Animal } from '../../../interfaces/animal.model';
import { AnimalSearch } from '../../../interfaces/animalsearch.model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'animal-table',
  templateUrl: './animal-table.component.html',
  styleUrl: './animal-table.component.css'
})
export class AnimalTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
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
    this.fetchAnimals(0, 10);
  }

  fetchAnimals(pageNo: number, pageSize: number): void {
    this.animalService.getAnimals(pageNo, pageSize).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  searchAnimal() {
    if (!this.searchAnimalModel.query) {
      this.fetchAnimals(0, 10);
    } else {
      this.animalService.searchAnimal(this.searchAnimalModel).subscribe((response) => {
        this.dataSource.data = response;
      });
    }
  }

  navigateToAddAnimal() {
    this.router.navigate(['/add-animal']);
  }

  editAnimal(animal: Animal): void {
    this.router.navigate(['/edit-animal', animal.id]);
  }

  onPageChange(event: PageEvent) {
    this.fetchAnimals(event.pageIndex, event.pageSize);
  }

  deleteAnimal(id: number): void {
    this.animalService.deleteAnimal(id).subscribe(() => {
      console.log('Animal deleted');
      this.fetchAnimals(0, 10);
    });
  }

  resetForm(): void {
    this.selectedAnimal = null;
    this.animalForm.reset();
  }

}
