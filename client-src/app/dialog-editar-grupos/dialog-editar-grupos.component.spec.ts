import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarGruposComponent } from './dialog-editar-grupos.component';

describe('DialogEditarGruposComponent', () => {
  let component: DialogEditarGruposComponent;
  let fixture: ComponentFixture<DialogEditarGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
