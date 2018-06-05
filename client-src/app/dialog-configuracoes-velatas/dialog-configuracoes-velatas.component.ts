import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { ConfiguracoesValeta } from '../models/configuracoes-valeta';
import { ConfiguracoesValetaConteudo } from '../models/configuracoes-valeta-conteudo';

import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';
import { DialogConfiguracoesValetasService } from './dialog-configuracoes-valetas.service';
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { DialogConfirmService } from './../dialog-confirm/dialog-confirm.service';

import { TrocarPainel } from "../enum/trocar-painel.enum";

@Component({
  selector: 'app-dialog-configuracoes-velatas',
  templateUrl: './dialog-configuracoes-velatas.component.html',
  styleUrls: ['./dialog-configuracoes-velatas.component.scss'],
  providers: [EmpresaFilialComponent]
})
export class DialogConfiguracoesVelatasComponent implements OnInit {
  configuracoesValeta: ConfiguracoesValeta;
  configuracoesValetaConteudo: ConfiguracoesValetaConteudo;
  empresas: any;
  listaGrupoValetas = [];
  optionsTrocarPainel: string[];
  trocarPainel: TrocarPainel;
  listTrocaPainel = [];
  configSuccess:boolean = false;
  configFailed:boolean = false;
  changeForm:boolean = false;

  constructor(
    private dialogRef: MdDialogRef < DialogConfiguracoesVelatasComponent > ,
    private dialog: MdDialog,
    public empresaFilialComponent: EmpresaFilialComponent,
    private service: DialogConfiguracoesValetasService,
    public notifyService: DialogResultErrorService,
    private dialogConfirmService: DialogConfirmService,
    @Inject(DOCUMENT) doc: any,
    @Inject(MD_DIALOG_DATA) private data: any) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('dialog-open')) {
        doc.body.classList.add('dialog-open');
      }
    });
    dialog.afterAllClosed.subscribe(() => {
      doc.body.classList.remove('dialog-open');
    });
  }

  ngOnInit() {
    this.configuracoesValeta = new ConfiguracoesValeta();
    this.configuracoesValetaConteudo = new ConfiguracoesValetaConteudo();
    this.configuracoesValetaConteudo.grupoValetaIds = [];

    this.obterParametros();
    this.obterTrocarPainel();
    this.obterGaragens();
    this.obterGrupoValetas();
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.changeForm = false;
    }, 2000);
  }

  obterTrocarPainel(){
    var x = TrocarPainel;
    var options = Object.keys(TrocarPainel);
    this.optionsTrocarPainel = options.slice(options.length / 2);

    for (var i = 0; i < this.optionsTrocarPainel.length; i++) {
      this.listTrocaPainel.push({
        key: this.optionsTrocarPainel[i],
        value: i
      });
    }
  }

  obterGrupoValetas() {
    this.service.obterGrupoValetas().subscribe((resp) => {
      this.listaGrupoValetas = resp.data;
    });
  };

  displayGrupoValetas(grupoValeta) {
    if (!grupoValeta)
      return;

    return grupoValeta.codigo + " - " + grupoValeta.descricao;
  }

  displayTrocarPaineis(trocarPaineis) {
    if (!trocarPaineis)
      return;

    return trocarPaineis.key;
  }

  obterGaragens() {
    this.empresaFilialComponent.obterGaragem().subscribe((resp) => {
      this.empresas = resp;
    });
  }

  handleValueUpdated(item) {
    this.configuracoesValetaConteudo.garagemId = item;
    this.changeForm = true;
  }

  obterParametros() {
    this.service.obterParametros().subscribe((resp) => {
      if (resp.data) {
        this.configuracoesValetaConteudo = resp.data;
      }
    });
  }

  onValueChangedGrupos(e) {
      this.configuracoesValetaConteudo.grupoValetaIds = e.value;
      this.changeForm = true
  }

  gravar() {
    this.configuracoesValeta.conteudo = this.configuracoesValetaConteudo;

    if (this.configuracoesValeta.conteudo) {
      this.service.gravarParametros(this.configuracoesValeta).subscribe((resp) => {
        if (resp.data) {
          this.configSuccess = true;
          this.notifyService.showWarning('Atenção', 'Configurações salvas com sucesso');
        } else {
          this.configFailed = true;
          this.notifyService.showWarning('Atenção', 'Houve um problema salvando os dados');
        }
      });
    }
  }

  Close(){
    if(this.changeForm){
      this.dialogConfirmService
      .confirm('Atenção', 'Existem alterações que foram feitas na tela e não foram salvas. Deseja realmente sair ?')
      .subscribe(res => {
          if (res){
           this.dialogRef.close()
          }
      });
  }else{
      this.dialogRef.close()
  }
  }

  OnValueChangedTime(){
    this.changeForm = true
  }

}
