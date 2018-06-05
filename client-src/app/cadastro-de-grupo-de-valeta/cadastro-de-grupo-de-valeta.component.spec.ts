import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeGrupoDeValetaComponent } from './cadastro-de-grupo-de-valeta.component';

describe('CadastroDeGrupoDeValetaComponent', () => {
  let component: CadastroDeGrupoDeValetaComponent;
  let fixture: ComponentFixture<CadastroDeGrupoDeValetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDeGrupoDeValetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeGrupoDeValetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
