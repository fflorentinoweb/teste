import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelDeValetasComponent } from './painel-de-valetas.component';

describe('PainelDeValetasComponent', () => {
  let component: PainelDeValetasComponent;
  let fixture: ComponentFixture<PainelDeValetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelDeValetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelDeValetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
