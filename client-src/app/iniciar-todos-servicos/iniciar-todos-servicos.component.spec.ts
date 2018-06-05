import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarTodosServicosComponent } from './iniciar-todos-servicos.component';

describe('IniciarTodosServicosComponent', () => {
  let component: IniciarTodosServicosComponent;
  let fixture: ComponentFixture<IniciarTodosServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarTodosServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarTodosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
