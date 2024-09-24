import { Component } from '@angular/core';
import { DataService } from '../../../services/cage-service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cage-add',
  templateUrl: './cage-add.component.html',
  styleUrl: './cage-add.component.css'
})
export class CageAddComponent {

  public newCage: any = { cageNumber: '', availability: '' };

  constructor(private service: DataService, private router: Router) {}

  addCage(): void {
    const newCageData = { ...this.newCage };
    this.service.addData(newCageData).subscribe((response) => {
      console.log('New cage added:', response);
      this.newCage = { cageNumber: '', availability: '' };
      this.navigateToCageTable();
    });
  }

  navigateToCageTable() {
    this.router.navigate(['/data']);
  }
  
}
