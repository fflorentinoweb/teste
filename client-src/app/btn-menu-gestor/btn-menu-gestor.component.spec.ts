import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMenuGestorComponent } from './btn-menu-gestor.component';

describe('BtnMenuGestorComponent', () => {
  let component: BtnMenuGestorComponent;
  let fixture: ComponentFixture<BtnMenuGestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnMenuGestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnMenuGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
