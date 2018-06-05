import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaFilialComponent } from './empresa-filial.component';

describe('EmpresaFilialComponent', () => {
  let component: EmpresaFilialComponent;
  let fixture: ComponentFixture<EmpresaFilialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaFilialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
