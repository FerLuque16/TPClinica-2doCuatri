import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadEspecialistaComponent } from './disponibilidad-especialista.component';

describe('DisponibilidadEspecialistaComponent', () => {
  let component: DisponibilidadEspecialistaComponent;
  let fixture: ComponentFixture<DisponibilidadEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibilidadEspecialistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibilidadEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
