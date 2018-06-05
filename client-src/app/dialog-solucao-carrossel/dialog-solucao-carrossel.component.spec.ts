import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSolucaoCarrosselComponent } from './dialog-solucao-carrossel.component';

describe('DialogSolucaoCarrosselComponent', () => {
  let component: DialogSolucaoCarrosselComponent;
  let fixture: ComponentFixture<DialogSolucaoCarrosselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSolucaoCarrosselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSolucaoCarrosselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
