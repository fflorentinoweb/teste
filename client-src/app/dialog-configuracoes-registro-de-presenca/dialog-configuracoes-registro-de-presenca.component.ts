import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';

import { DialogConfiguracoesRegistroDePresencaService } from './dialog-configuracoes-registro-de-presenca.service';
import { ConfiguracoesRegistroDePresenca } from './../models/configuracoes-registro-de-presenca'
import { ConfiguracoesRegistroDePresencaConteudo } from './../models/configuracoes-resgistro-de-presenca-conteudo'
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { DialogConfirmService } from './../dialog-confirm/dialog-confirm.service';

@Component({
  selector: 'app-dialog-configuracoes-registro-de-presenca',
  templateUrl: './dialog-configuracoes-registro-de-presenca.component.html',
  styleUrls: ['./dialog-configuracoes-registro-de-presenca.component.scss'],
  providers: [EmpresaFilialComponent]  
})
export class DialogConfiguracoesRegistroDePresencaComponent implements OnInit {
  empresas: any
  configuracaoRegistroDePresenca: ConfiguracoesRegistroDePresenca  
  configuracoesConteudo: ConfiguracoesRegistroDePresencaConteudo
  configSuccess:boolean = false;
  configFailed:boolean = false;
  changeForm:boolean = false;

  constructor(
    private dialogRef: MdDialogRef<DialogConfiguracoesRegistroDePresencaComponent>,
    private dialog: MdDialog,
    private dialogConfiguracoesRegistroDePresencaService: DialogConfiguracoesRegistroDePresencaService,
    public empresaFilialComponent: EmpresaFilialComponent,
    public notifyService: DialogResultErrorService,
    private dialogConfirmService: DialogConfirmService) {
     }

  ngOnInit() {
    this.configuracaoRegistroDePresenca = new ConfiguracoesRegistroDePresenca()
    this.configuracoesConteudo = new ConfiguracoesRegistroDePresencaConteudo()
    this.getGaragens()
    this.obterConfiguracao()
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.changeForm = false;
    }, 2000);
  }

  getGaragens(){
    this.empresaFilialComponent.obterGaragem().subscribe((resp) => {
      this.empresas = resp;
    });
  }

  handleValueUpdated(value){
    this.configuracoesConteudo.garagemId = value
    this.configuracaoRegistroDePresenca.conteudo = this.configuracoesConteudo
    this.changeForm = true
  }    

  obterConfiguracao(){
    this.dialogConfiguracoesRegistroDePresencaService.obterParametros().subscribe((resp) => {
      if(resp.data){
        this.configuracoesConteudo = resp.data;
      }
    });
  }

  gravar(){
    this.configuracaoRegistroDePresenca.tipo = 2
    this.configuracaoRegistroDePresenca.conteudo = this.configuracoesConteudo
    if(this.configuracaoRegistroDePresenca.conteudo){
    this.dialogConfiguracoesRegistroDePresencaService.gravarParametros(this.configuracaoRegistroDePresenca).subscribe((resp) => {
      if(resp.data){
        this.configSuccess = true;
        this.notifyService.showWarning('Atenção', 'Configurações salvas com sucesso');
      }
      else{
        this.configFailed = true;
        this.notifyService.showWarning('Atenção', 'Houve um problema salvando os dados');   
      }
    })
  }
}

Close(){
  if(this.changeForm){
    this.dialogConfirmService
    .confirm('Atenção', 'Existem alterações que foram feitas na tela e não foram salvas. Deseja realmente sair ?')
    .subscribe(res => {
        if (res){
         this.dialogRef.close(this.configuracoesConteudo.garagemId)
        }
    });
}else{
    this.dialogRef.close()
}
}
}
