import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PausarOsComponent } from './pausar-os.component';

describe('PausarOsComponent', () => {
  let component: PausarOsComponent;
  let fixture: ComponentFixture<PausarOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PausarOsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PausarOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
