import { Component, OnInit, Inject  } from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { DialogCadastroDeValetaService } from './dialog-cadastro-de-valeta.service'
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";

import { Valeta } from "../models/valeta";

import { Globals } from './../globals';

import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';

@Component({
  selector: 'app-dialog-cadastro-de-valeta',
  templateUrl: './dialog-cadastro-de-valeta.component.html',
  styleUrls: ['./dialog-cadastro-de-valeta.component.scss'],
  providers: [EmpresaFilialComponent]
})
export class DialogCadastroDeValetaComponent implements OnInit {
    valeta: Valeta;
    listaGrupoValetas = [];
    submitted: boolean = false;
    validationGrupoValid: boolean = false;
    validationGrupoDirty: boolean = false;
    disabledSalvar: boolean = false;
    process = false;
    empresaAssociacaoId:number;
    empresas: any;
    verificaChangeForm: boolean = false

    constructor(
        private service: DialogCadastroDeValetaService,
        private dialogRef: MdDialogRef<DialogCadastroDeValetaComponent>,
        public dialogConfirmService: DialogConfirmService,
        public notifyService: DialogResultErrorService,
        public dialog: MdDialog,
        private globals: Globals,
        public empresaFilialComponent: EmpresaFilialComponent,
      @Inject(DOCUMENT) doc: any) {
        dialog.afterOpen.subscribe(() => {
            if (!doc.body.classList.contains('dialog-open')) {
                doc.body.classList.add('dialog-open');
            }
        });
        dialog.afterAllClosed.subscribe(() => {
            doc.body.classList.remove('dialog-open');
        });
      }

    ngOnInit(){
        this.valeta = new Valeta();
        this.obterGrupoValetas();
        this.getGaragens();
    }

    ngOnChanges(){
        this.verificaChangeForm = false
    }

    getGaragens(){
        this.empresaFilialComponent.obterGaragem().subscribe((resp) => {
            this.empresas = resp;
        });
    }

    handleValueUpdated(value, form: FormGroup){
        this.empresaAssociacaoId = value;
        this.verificaChangeForm = true
        this.reiniciarForm(form);        
    }

    iniciarCadastro(){
        this.service.obterProximoCodigo(this.empresaAssociacaoId).subscribe((resp) => {
          this.valeta = new Valeta(resp.data, this.empresaAssociacaoId);
        });
    }

    reiniciarForm(form: FormGroup, codigoAtual?: number){
        this.submitted = false;
        this.validationGrupoValid = false;
        this.validationGrupoDirty = false;

        if (codigoAtual){
            this.valeta = new Valeta(codigoAtual, this.empresaAssociacaoId);
            form.reset(this.valeta);
        } else {
            form.reset();
            this.iniciarCadastro();
        }
    }

    obterGrupoValetas(){
        this.service.obterGrupoValetas().subscribe((resp) => {
                this.listaGrupoValetas = resp.data;
        });
    };

    obterPorCodigo(form: FormGroup){
        if(!form.controls.codigo.errors){
            if (this.valeta.codigo == 0){
                this.valeta = new Valeta();
                this.verificaChangeForm = true;
            }
            else {
                this.service.obterPorCodigo(this.valeta.codigo, this.valeta.empresaAssociacaoId).subscribe((resp) => {
                    if (resp.data != null)
                        this.valeta = resp.data;
                    else
                        this.reiniciarForm(form, this.valeta.codigo);
                });
            }
        }
    }

    salvar(form: FormGroup){
        this.submitted = true;

        if(form.valid && this.validationGrupoValid && form.controls.quantidadeVeiculos.value > 0){
            this.process = true;
            if (this.valeta.id > 0)
                this.service.alterar(this.valeta).subscribe((resp) => {
                    this.notifyService.showWarning('Atenção', 'Valeta alterada com sucesso');
                    this.reiniciarForm(form);
                    this.process = false;
                });
            else
                this.service.inserir(this.valeta).subscribe((resp) => {
                    this.notifyService.showWarning('Atenção', 'Valeta inserida com sucesso');
                    this.reiniciarForm(form);
                    this.process = false;
                });
        }
    }

    displayGrupoValetas(grupoValeta) {
		if (!grupoValeta)
			return;

		return grupoValeta.codigo + " - " + grupoValeta.descricao;
	}

    disabledExcluir(){
        return this.valeta.id == 0;
    }

    disabledCampos(){
        return !this.valeta.ativa;
    }

    clickSituacao(){
        if(this.valeta.ativa){
            this.disabledSalvar = true;
            this.service.obterPorCodigo(this.valeta.codigo, this.valeta.empresaAssociacaoId).subscribe((resp) => {

                if(resp.data != null){
                    this.valeta.quantidadeVeiculos = resp.data.quantidadeVeiculos;
                    this.valeta.descricao = resp.data.descricao;
                    this.valeta.grupoValetaId = resp.data.grupoValetaId;
                    this.valeta.tipo = resp.data.tipo;
                }

                this.disabledSalvar = false;
            });
        }
    }

    excluir(form: FormGroup){
        this.dialogConfirmService
            .confirm('Atenção', 'Deseja realmente excluir a valeta?')
            .subscribe(res => {
                if (res)
                    this.service.excluir(this.valeta.id).subscribe(resp => {
                        this.notifyService.showWarning('Atenção', 'Valeta excluída com sucesso');
                        this.reiniciarForm(form);
                    });
            });
    }

    verificarCampo(data){
        if(data.grupoValetaId == undefined || data.grupoValetaId == null){
            this.validationGrupoValid = false;
            this.process = false;            
        } else{
            this.validationGrupoValid = true;
            this.validationGrupoDirty = true;
            this.verificaChangeForm = true
        }
    }

    Close(){        
        if(this.verificaChangeForm){
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


    public OnChange(){
        this.verificaChangeForm = true
    }
}
