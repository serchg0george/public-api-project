import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CageAddComponent } from './cage-add.component';

describe('CageAddComponent', () => {
  let component: CageAddComponent;
  let fixture: ComponentFixture<CageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CageAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
