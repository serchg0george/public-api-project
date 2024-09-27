import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/cage-service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cage-edit',
  templateUrl: './cage-edit.component.html',
  styleUrl: './cage-edit.component.css'
})
export class CageEditComponent implements OnInit {
  public cage: any = { id: null, cageNumber: '', availability: '' };

  constructor(private service: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['cage']) {
        this.cage = JSON.parse(params['cage'])
      }
    });
  }

  onSubmitEdit(): void {
    this.service.editData(this.cage.id, this.cage).subscribe((response) => {
      console.log('Item updated:', response);
      this.router.navigate(['/data']);
    });
  }
}
