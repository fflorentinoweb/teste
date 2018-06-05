import { OsMecanicosComponent } from './os-mecanicos/os-mecanicos.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class CanDeactivateOsMecanicos implements CanDeactivate<OsMecanicosComponent> {
  constructor() {}
 
  canDeactivate(): boolean {
    localStorage.removeItem("funcionario");
    return true;
  }
}