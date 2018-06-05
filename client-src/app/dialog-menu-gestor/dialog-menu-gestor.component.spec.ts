import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMenuGestorComponent } from './dialog-menu-gestor.component';

describe('DialogMenuGestorComponent', () => {
  let component: DialogMenuGestorComponent;
  let fixture: ComponentFixture<DialogMenuGestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMenuGestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMenuGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
