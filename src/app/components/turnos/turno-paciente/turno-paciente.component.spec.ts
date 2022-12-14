import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoPacienteComponent } from './turno-paciente.component';

describe('TurnoPacienteComponent', () => {
  let component: TurnoPacienteComponent;
  let fixture: ComponentFixture<TurnoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
