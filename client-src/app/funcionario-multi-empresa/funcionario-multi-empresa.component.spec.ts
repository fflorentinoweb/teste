import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioMultiEmpresaComponent } from './funcionario-multi-empresa.component';

describe('FuncionarioMultiEmpresaComponent', () => {
  let component: FuncionarioMultiEmpresaComponent;
  let fixture: ComponentFixture<FuncionarioMultiEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioMultiEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioMultiEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
