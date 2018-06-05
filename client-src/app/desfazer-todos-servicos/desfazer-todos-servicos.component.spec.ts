import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesfazerTodosServicosComponent } from './desfazer-todos-servicos.component';

describe('DesfazerTodosServicosComponent', () => {
  let component: DesfazerTodosServicosComponent;
  let fixture: ComponentFixture<DesfazerTodosServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesfazerTodosServicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesfazerTodosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
