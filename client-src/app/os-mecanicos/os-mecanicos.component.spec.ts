import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsMecanicosComponent } from './os-mecanicos.component';

describe('OsMecanicosComponent', () => {
  let component: OsMecanicosComponent;
  let fixture: ComponentFixture<OsMecanicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsMecanicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsMecanicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
