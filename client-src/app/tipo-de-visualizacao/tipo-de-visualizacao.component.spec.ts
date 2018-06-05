import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeVisualizacaoComponent } from './tipo-de-visualizacao.component';

describe('TipoDeVisualizacaoComponent', () => {
  let component: TipoDeVisualizacaoComponent;
  let fixture: ComponentFixture<TipoDeVisualizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeVisualizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
