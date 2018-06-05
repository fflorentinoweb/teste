import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeValetaComponent } from './cadastro-de-valeta.component';

describe('CadastroDeValetaComponent', () => {
  let component: CadastroDeValetaComponent;
  let fixture: ComponentFixture<CadastroDeValetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDeValetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeValetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
