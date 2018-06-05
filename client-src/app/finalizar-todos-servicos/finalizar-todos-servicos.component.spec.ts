import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarTodosServicosComponent } from './finalizar-todos-servicos.component';

describe('FinalizarTodosServicosComponent', () => {
  let component: FinalizarTodosServicosComponent;
  let fixture: ComponentFixture<FinalizarTodosServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarTodosServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarTodosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
