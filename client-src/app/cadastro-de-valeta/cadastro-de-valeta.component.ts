import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { DialogCadastroDeValetaComponent } from '../dialog-cadastro-de-valeta/dialog-cadastro-de-valeta.component';

@Component({
  selector: 'app-cadastro-de-valeta',
  templateUrl: './cadastro-de-valeta.component.html',
  styleUrls: ['./cadastro-de-valeta.component.scss']
})
export class CadastroDeValetaComponent {
  config: MdDialogConfig = {
      width: '650px',
      disableClose:true
  };

  constructor(public dialog: MdDialog) { }

  public adicionarValeta() {
    this.dialog.open(DialogCadastroDeValetaComponent, this.config);
  }


}
