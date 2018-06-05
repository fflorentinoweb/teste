import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoManuComponent } from './logo-manu.component';

describe('LogoManuComponent', () => {
  let component: LogoManuComponent;
  let fixture: ComponentFixture<LogoManuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoManuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoManuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
