import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoTodosComponent } from './turno-todos.component';

describe('TurnoTodosComponent', () => {
  let component: TurnoTodosComponent;
  let fixture: ComponentFixture<TurnoTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoTodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
