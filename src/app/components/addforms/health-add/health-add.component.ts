import { Component } from '@angular/core';
import { HealthService } from '../../../services/health-service/health.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-add',
  templateUrl: './health-add.component.html',
  styleUrl: './health-add.component.css'
})
export class HealthAddComponent {
  public newHealth: any = { status: '' };

  constructor(private service: HealthService, private router: Router) { }

  addHealth(): void {
    const newHealthData = { ...this.newHealth };
    this.service.addHealth(newHealthData).subscribe((response) => {
      console.log('New health added:', response);
      this.newHealth = { status: '' };
      this.navigateToHealth();
    });
  }

  navigateToHealth() {
    this.router.navigate(['/health'])
  }
}
