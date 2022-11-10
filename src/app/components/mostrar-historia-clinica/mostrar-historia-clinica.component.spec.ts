import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarHistoriaClinicaComponent } from './mostrar-historia-clinica.component';

describe('MostrarHistoriaClinicaComponent', () => {
  let component: MostrarHistoriaClinicaComponent;
  let fixture: ComponentFixture<MostrarHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarHistoriaClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
