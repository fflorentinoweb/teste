import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCadastroTipoOleoComponent } from './dialog-cadastro-tipo-oleo.component';

describe('DialogCadastroTipoOleoComponent', () => {
  let component: DialogCadastroTipoOleoComponent;
  let fixture: ComponentFixture<DialogCadastroTipoOleoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCadastroTipoOleoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCadastroTipoOleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
