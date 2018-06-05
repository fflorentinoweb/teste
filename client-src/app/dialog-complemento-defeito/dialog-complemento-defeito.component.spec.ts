import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComplementoDefeitoComponent } from './dialog-complemento-defeito.component';

describe('DialogComplementoDefeitoComponent', () => {
  let component: DialogComplementoDefeitoComponent;
  let fixture: ComponentFixture<DialogComplementoDefeitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComplementoDefeitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComplementoDefeitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
