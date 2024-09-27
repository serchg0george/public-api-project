import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAddComponent } from './health-add.component';

describe('HealthAddComponent', () => {
  let component: HealthAddComponent;
  let fixture: ComponentFixture<HealthAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
