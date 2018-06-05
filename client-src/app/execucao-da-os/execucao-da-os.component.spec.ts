import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecucaoDaOsComponent } from './execucao-da-os.component';

describe('ExecucaoDaOsComponent', () => {
  let component: ExecucaoDaOsComponent;
  let fixture: ComponentFixture<ExecucaoDaOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecucaoDaOsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecucaoDaOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
