import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacaoMecanicoComponent } from './autenticacao-mecanico.component';

describe('AutenticacaoMecanicoComponent', () => {
  let component: AutenticacaoMecanicoComponent;
  let fixture: ComponentFixture<AutenticacaoMecanicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticacaoMecanicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacaoMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
