import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { RegistroDePresencaService } from './registro-de-presenca.service';
import { DialogAtividadesExecutadasComponent } from '../dialog-atividades-executadas/dialog-atividades-executadas.component';
import { DialogConfiguracoesRegistroDePresencaComponent } from './../dialog-configuracoes-registro-de-presenca/dialog-configuracoes-registro-de-presenca.component';
import { ConfiguracoesRegistroDePresencaConteudo } from './../models/configuracoes-resgistro-de-presenca-conteudo';
@Component({
  selector: 'app-resgistro-de-presenca',
  templateUrl: './resgistro-de-presenca.component.html',
  styleUrls: ['./resgistro-de-presenca.component.scss']
})
export class ResgistroDePresencaComponent implements OnInit {
  listaDeFuncionarios = []
  configuracoesRegistroDePresencaConteudo: ConfiguracoesRegistroDePresencaConteudo
  timerAtualizaConsulta: any
  dialogRef: MdDialogRef<DialogConfiguracoesRegistroDePresencaComponent>

  constructor(public dialog: MdDialog,
    private registroDePresencaService: RegistroDePresencaService) {}
  calculateCellValue(data) {
    return [data.Title, data.FirstName, data.LastName].join('');
  }

  ngOnInit() {
    this.checkConfig()
  }

  OnClick(item) {
    if (item.data.situacao == 'Disponível' || item.data.situacao == 'Ausente') {
      return false
    } else {
      this.dialog.open(DialogAtividadesExecutadasComponent, {
        width: '460px',
        data: item,
        disableClose:true
      });
    }
  }

  ObterFuncionarioPorEmpresaAssociacao(value) {
    this.registroDePresencaService.ObterFuncionarioPorEmpresaAssociacao(value).subscribe((resp) => {
      this.listaDeFuncionarios = resp.data
      this.timerAtualizaConsulta = Observable.timer(30000).first().subscribe(() => this.ObterFuncionarioPorEmpresaAssociacao(this.configuracoesRegistroDePresencaConteudo.garagemId));
    });
  }

  checkConfig() {
    this.registroDePresencaService.obterParametros().subscribe((resp) => {
      if (resp.data) {
        this.configuracoesRegistroDePresencaConteudo = resp.data;
        this.ObterFuncionarioPorEmpresaAssociacao(this.configuracoesRegistroDePresencaConteudo.garagemId)
      } else {
        this.configuracoes();
      }
    });
  }

  configuracoes() {
    this.dialogRef =  this.dialog.open(DialogConfiguracoesRegistroDePresencaComponent, {
      width: '460px',
      disableClose:true
    });
    this.dialogRef.afterClosed().subscribe((resp) => {
      this.checkConfig()
    });
  }

}
