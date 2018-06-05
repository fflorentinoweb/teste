import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistroDePresencaComponent } from './resgistro-de-presenca.component';

describe('ResgistroDePresencaComponent', () => {
  let component: ResgistroDePresencaComponent;
  let fixture: ComponentFixture<ResgistroDePresencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResgistroDePresencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgistroDePresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
