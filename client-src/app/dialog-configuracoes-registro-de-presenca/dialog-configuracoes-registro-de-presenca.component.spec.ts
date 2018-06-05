import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfiguracoesRegistroDePresencaComponent } from './dialog-configuracoes-registro-de-presenca.component';

describe('DialogConfiguracoesRegistroDePresencaComponent', () => {
  let component: DialogConfiguracoesRegistroDePresencaComponent;
  let fixture: ComponentFixture<DialogConfiguracoesRegistroDePresencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfiguracoesRegistroDePresencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfiguracoesRegistroDePresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
