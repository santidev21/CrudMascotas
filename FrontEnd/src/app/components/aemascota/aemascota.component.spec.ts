import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AemascotaComponent } from './aemascota.component';

describe('AemascotaComponent', () => {
  let component: AemascotaComponent;
  let fixture: ComponentFixture<AemascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AemascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AemascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
