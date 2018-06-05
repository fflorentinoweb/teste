import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAtividadesExecutadasComponent } from './dialog-atividades-executadas.component';

describe('DialogAtividadesExecutadasComponent', () => {
  let component: DialogAtividadesExecutadasComponent;
  let fixture: ComponentFixture<DialogAtividadesExecutadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAtividadesExecutadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAtividadesExecutadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
