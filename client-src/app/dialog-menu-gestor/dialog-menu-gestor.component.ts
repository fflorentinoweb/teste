import { Component, OnInit, Input, Inject, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DOCUMENT } from '@angular/platform-browser';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { DialogCadastroDeValetaComponent } from '../dialog-cadastro-de-valeta/dialog-cadastro-de-valeta.component';
import { DialogCadastroDeGrupoDeValetaComponent } from '../dialog-cadastro-de-grupo-de-valeta/dialog-cadastro-de-grupo-de-valeta.component';
import { Globals } from './../globals';

@Component({
  selector: 'app-dialog-menu-gestor',
  templateUrl: './dialog-menu-gestor.component.html',
  styleUrls: ['./dialog-menu-gestor.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({
          transform: 'scale3d(1.5, 1.5, 1.5)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate('300ms cubic-bezier(0.86, 0, 0.37, 1.01)', style({
          'transform': 'translateY(200px)',
          'opacity': '0'
        }))
      ])
    ])
  ]
})
export class DialogMenuGestorComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter < boolean > = new EventEmitter < boolean > ();
  opened: boolean = false
  config: MdDialogConfig = {
    width: '650px',
    disableClose: true
  };


  constructor(@Inject(DOCUMENT) private doc: any, public dialog: MdDialog, private globals: Globals) {
    dialog.afterAllClosed.subscribe(() => {
      this.opened = false
    });
  }

  ngOnInit() {}

  open() {
    this.doc.body.classList.add('menu-open');
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.globals.menuvisible = false;
    setTimeout(() => {
      this.doc.body.classList.remove('menu-open');
      // this.doc.body.classList.remove('dialog-open');
    }, 300);
  }

  public adicionarValeta() {
    this.dialog.open(DialogCadastroDeValetaComponent, this.config);
    this.opened = true    
  }

  public adicionarGrupoDeValeta() {
    this.dialog.open(DialogCadastroDeGrupoDeValetaComponent, this.config);
    this.opened = true
  }


}
