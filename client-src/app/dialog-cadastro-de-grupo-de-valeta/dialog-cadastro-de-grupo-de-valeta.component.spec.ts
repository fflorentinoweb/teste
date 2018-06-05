import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCadastroDeGrupoDeValetaComponent } from './dialog-cadastro-de-grupo-de-valeta.component';

describe('DialogCadastroDeGrupoDeValetaComponent', () => {
  let component: DialogCadastroDeGrupoDeValetaComponent;
  let fixture: ComponentFixture<DialogCadastroDeGrupoDeValetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCadastroDeGrupoDeValetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCadastroDeGrupoDeValetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
