import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoOsVeiculoComponent } from './alocacao-os-veiculo.component';

describe('AlocacaoOsVeiculoComponent', () => {
  let component: AlocacaoOsVeiculoComponent;
  let fixture: ComponentFixture<AlocacaoOsVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocacaoOsVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocacaoOsVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
