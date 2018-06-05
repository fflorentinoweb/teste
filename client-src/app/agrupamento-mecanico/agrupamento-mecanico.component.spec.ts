import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrupamentoMecanicoComponent } from './agrupamento-mecanico.component';

describe('AgrupamentoMecanicoComponent', () => {
  let component: AgrupamentoMecanicoComponent;
  let fixture: ComponentFixture<AgrupamentoMecanicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrupamentoMecanicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrupamentoMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
