import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthEditComponent } from './health-edit.component';

describe('HealthEditComponent', () => {
  let component: HealthEditComponent;
  let fixture: ComponentFixture<HealthEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
