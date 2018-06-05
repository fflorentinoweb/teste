import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateOsMecanicos implements CanActivate {
  constructor() {}
 
  canActivate(): boolean {
    let funcionario = JSON.parse(localStorage.getItem('funcionario'));
    return funcionario != null;
  }
}