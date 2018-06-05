import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSolucaoComponent } from './dialog-solucao.component';

describe('DialogSolucaoComponent', () => {
  let component: DialogSolucaoComponent;
  let fixture: ComponentFixture<DialogSolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
