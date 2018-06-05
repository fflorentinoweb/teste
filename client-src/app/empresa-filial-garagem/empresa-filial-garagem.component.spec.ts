import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaFilialGaragemComponent } from './empresa-filial-garagem.component';

describe('EmpresaFilialGaragemComponent', () => {
  let component: EmpresaFilialGaragemComponent;
  let fixture: ComponentFixture<EmpresaFilialGaragemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaFilialGaragemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaFilialGaragemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
