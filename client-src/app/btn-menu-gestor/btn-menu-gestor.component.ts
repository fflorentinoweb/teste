import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Globals } from './../globals';

@Component({
  selector: 'app-btn-menu-gestor',
  templateUrl: './btn-menu-gestor.component.html',
  styleUrls: ['./btn-menu-gestor.component.scss']
})
export class BtnMenuGestorComponent implements OnInit {
  document: any;
  constructor(private globals: Globals,
     @Inject(DOCUMENT) doc: any) {
      this.document = doc
  }

  ngOnInit() {
  }

  openMenu(){
    this.globals.menuvisible = !this.globals.menuvisible
    if (this.globals.menuvisible) {
        this.document.body.classList.add('menu-open');
    }
  }

}
