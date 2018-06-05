import { Component, OnInit, Inject } from '@angular/core';
import { RegistroDePresencaService } from './../resgistro-de-presenca/registro-de-presenca.service';

import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { DisponibilidadeFuncionario } from './../models/disponibilidade-funcionario';
import { DialogAtividadesExecutadasService } from './dialog-atividades-executadas.service';
import { AtividadesExecutadas } from './../models/atividades-executadas';





@Component({
  selector: 'app-dialog-atividades-executadas',
  templateUrl: './dialog-atividades-executadas.component.html',
  styleUrls: ['./dialog-atividades-executadas.component.scss']
})
export class DialogAtividadesExecutadasComponent implements OnInit {

  nomeFuncionario: string
  informacoesFuncionario: any = []
  informacoesDialog: any = []
  atividadesFuncionario: AtividadesExecutadas[] = [];
  
  constructor(
    private dialog: MdDialog,    
    private dialogRef: MdDialogRef<DialogAtividadesExecutadasComponent>,
    public dialogAtividadesExecutadasService: DialogAtividadesExecutadasService,
    @Inject(MD_DIALOG_DATA) private data: any) {
    
   }

  ngOnInit() {
    // this.nomeFuncionario = this.data.key.nome
    this.informacoesFuncionario = this.data.key    
    this.ObterDetalhesAtividadesFuncionario()
  }

  ObterDetalhesAtividadesFuncionario(){
    this.dialogAtividadesExecutadasService.ObterDetalhesAtividadesFuncionario(this.informacoesFuncionario.osId,this.informacoesFuncionario.id).subscribe((resp) => {
      this.informacoesDialog = resp.data
      this.atividadesFuncionario = this.informacoesDialog.grupos
		});
  }

}
