import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsOverviewComponent } from './tabs-overview.component';

describe('TabsOverviewComponent', () => {
  let component: TabsOverviewComponent;
  let fixture: ComponentFixture<TabsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
