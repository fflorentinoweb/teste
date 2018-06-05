import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAutenticacaoFuncionarioComponent } from './dialog-autenticacao-funcionario.component';

describe('DialogAutenticacaoFuncionarioComponent', () => {
  let component: DialogAutenticacaoFuncionarioComponent;
  let fixture: ComponentFixture<DialogAutenticacaoFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAutenticacaoFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAutenticacaoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
