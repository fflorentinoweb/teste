import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesColetivasComponent } from './acoes-coletivas.component';

describe('AcoesColetivasComponent', () => {
  let component: AcoesColetivasComponent;
  let fixture: ComponentFixture<AcoesColetivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcoesColetivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcoesColetivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
