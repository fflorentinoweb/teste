import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaFilialGaragemExecucaoDaOsComponent } from './empresa-filial-garagem-execucao-da-os.component';

describe('EmpresaFilialGaragemExecucaoDaOsComponent', () => {
  let component: EmpresaFilialGaragemExecucaoDaOsComponent;
  let fixture: ComponentFixture<EmpresaFilialGaragemExecucaoDaOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaFilialGaragemExecucaoDaOsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaFilialGaragemExecucaoDaOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
