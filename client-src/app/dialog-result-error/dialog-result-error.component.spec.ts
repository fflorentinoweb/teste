import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResultErrorComponent } from './dialog-result-error.component';

describe('DialogResultErrorComponent', () => {
  let component: DialogResultErrorComponent;
  let fixture: ComponentFixture<DialogResultErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResultErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResultErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
