import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { DialogMenuGestorComponent } from './dialog-menu-gestor/dialog-menu-gestor.component';
import { Globals } from './globals';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogMenuGestorComponent]
})
export class AppComponent {

  visible = false

  constructor(
    private router: Router,
    public dialogMenuGestorComponent: DialogMenuGestorComponent,
    private globals: Globals, @Inject(DOCUMENT) doc: any) {
  
  }

  openMenu() {
    this.globals.menuvisible = true
    this.dialogMenuGestorComponent.open();
  }

}

