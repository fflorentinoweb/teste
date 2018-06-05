import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCadastroDeValetaComponent } from './dialog-cadastro-de-valeta.component';

describe('DialogCadastroDeValetaComponent', () => {
  let component: DialogCadastroDeValetaComponent;
  let fixture: ComponentFixture<DialogCadastroDeValetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCadastroDeValetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCadastroDeValetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
