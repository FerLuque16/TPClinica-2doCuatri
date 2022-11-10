import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoriaClinicaComponent } from './modal-historia-clinica.component';

describe('ModalHistoriaClinicaComponent', () => {
  let component: ModalHistoriaClinicaComponent;
  let fixture: ComponentFixture<ModalHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistoriaClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
