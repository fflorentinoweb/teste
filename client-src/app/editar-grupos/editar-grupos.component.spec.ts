import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGruposComponent } from './editar-grupos.component';

describe('EditarGruposComponent', () => {
  let component: EditarGruposComponent;
  let fixture: ComponentFixture<EditarGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
