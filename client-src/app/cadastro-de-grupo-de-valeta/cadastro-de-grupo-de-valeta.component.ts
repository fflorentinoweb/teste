import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { DialogCadastroDeGrupoDeValetaComponent } from '../dialog-cadastro-de-grupo-de-valeta/dialog-cadastro-de-grupo-de-valeta.component';

@Component({
  selector: 'app-cadastro-de-grupo-de-valeta',
  templateUrl: './cadastro-de-grupo-de-valeta.component.html',
  styleUrls: ['./cadastro-de-grupo-de-valeta.component.scss']
})
export class CadastroDeGrupoDeValetaComponent {
  config: MdDialogConfig = {
      width: '650px',			
      disableClose:true
  };

  constructor(public dialog: MdDialog) { }

  public adicionarGrupoDeValeta() {
    this.dialog.open(DialogCadastroDeGrupoDeValetaComponent, this.config);
  }
}



