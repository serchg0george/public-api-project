import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../../services/health-service/health.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-health-edit',
  templateUrl: './health-edit.component.html',
  styleUrl: './health-edit.component.css'
})
export class HealthEditComponent implements OnInit {
  public health: any = { id: null, healthStatus: '' };

  constructor(private service: HealthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['health']) {
        this.health = JSON.parse(params['health'])
      }
    });
  }

  onSubmitEdit(): void {
    this.service.editHealth(this.health.id, this.health).subscribe((response) => {
      console.log('Health updated:', response);
      this.router.navigate(['/health']);
    });
  }
}
