import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfiguracoesVelatasComponent } from './dialog-configuracoes-velatas.component';

describe('DialogConfiguracoesVelatasComponent', () => {
  let component: DialogConfiguracoesVelatasComponent;
  let fixture: ComponentFixture<DialogConfiguracoesVelatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfiguracoesVelatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfiguracoesVelatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
