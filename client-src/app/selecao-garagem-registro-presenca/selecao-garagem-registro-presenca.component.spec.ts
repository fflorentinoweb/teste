import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoGaragemRegistroPresencaComponent } from './selecao-garagem-registro-presenca.component';

describe('SelecaoGaragemRegistroPresencaComponent', () => {
  let component: SelecaoGaragemRegistroPresencaComponent;
  let fixture: ComponentFixture<SelecaoGaragemRegistroPresencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoGaragemRegistroPresencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoGaragemRegistroPresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
