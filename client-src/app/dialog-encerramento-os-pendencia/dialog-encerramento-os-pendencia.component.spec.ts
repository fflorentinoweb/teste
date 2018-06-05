import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEncerramentoOsPendenciaComponent } from './dialog-encerramento-os-pendencia.component';

describe('DialogEncerramentoOsPendenciaComponent', () => {
  let component: DialogEncerramentoOsPendenciaComponent;
  let fixture: ComponentFixture<DialogEncerramentoOsPendenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEncerramentoOsPendenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEncerramentoOsPendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
