import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsultaSolucaoComponent } from './dialog-consulta-solucao.component';

describe('DialogConsultaSolucaoComponent', () => {
  let component: DialogConsultaSolucaoComponent;
  let fixture: ComponentFixture<DialogConsultaSolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConsultaSolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultaSolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
