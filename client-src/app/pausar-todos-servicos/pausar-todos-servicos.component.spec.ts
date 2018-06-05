import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PausarTodosServicosComponent } from './pausar-todos-servicos.component';

describe('PausarTodosServicosComponent', () => {
  let component: PausarTodosServicosComponent;
  let fixture: ComponentFixture<PausarTodosServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PausarTodosServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PausarTodosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
