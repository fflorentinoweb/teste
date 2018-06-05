import { Component, OnInit, Inject  } from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { DialogCadastroDeGrupoDeValetaService } from './dialog-cadastro-de-grupo-de-valeta.service'
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";

import { GrupoDeValeta } from "../models/grupo-de-valeta";

import { Globals } from './../globals';

@Component({
    selector: 'app-dialog-cadastro-de-grupo-de-valeta',
    templateUrl: './dialog-cadastro-de-grupo-de-valeta.component.html',
    styleUrls: ['./dialog-cadastro-de-grupo-de-valeta.component.scss']
})
export class DialogCadastroDeGrupoDeValetaComponent implements OnInit {
    grupoDeValeta: GrupoDeValeta;
    submitted: boolean = false;
    process = false;
    verificaChangeForm: boolean = false

    constructor(
        private service: DialogCadastroDeGrupoDeValetaService,
        private dialogRef: MdDialogRef<DialogCadastroDeGrupoDeValetaComponent>,
        public dialogConfirmService: DialogConfirmService,
        public notifyService: DialogResultErrorService,
        public dialog: MdDialog,
        private globals: Globals,
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
        this.grupoDeValeta = new GrupoDeValeta();
        this.iniciarCadastro();
    }

    iniciarCadastro(){
        this.service.obterProximoCodigo().subscribe((resp) => {
            this.grupoDeValeta = new GrupoDeValeta(resp.data);
        });
    }

    obterPorCodigo(form: FormGroup){
        if(!form.controls.codigo.errors){
            if (this.grupoDeValeta.codigo == 0)
                this.grupoDeValeta = new GrupoDeValeta();
            else {
                this.service.obterPorCodigo(this.grupoDeValeta.codigo).subscribe((resp) => {
                    if (resp.data != null)
                        this.grupoDeValeta = resp.data;
                        
                    else
                        this.reiniciarForm(form, this.grupoDeValeta.codigo);
                        this.process = false;
                });
            }
        }
    }

    disabledExcluir(){
        return this.grupoDeValeta.id == 0;
    }

    disabledSalvar(){
        return (!(this.grupoDeValeta.codigo > 0 && this.grupoDeValeta.descricao != null && this.grupoDeValeta.descricao.length > 0 ));
    }

    salvar(form: FormGroup){
        this.submitted = true;        
        if (form.valid){
          this.process = true;
            if (this.grupoDeValeta.id > 0)
                this.service.alterar(this.grupoDeValeta).subscribe((resp) => {
                    this.notifyService.showWarning('Atenção', 'Grupo de valeta alterado com sucesso');
                    this.reiniciarForm(form);
                    this.process = false;
                });
            else
                this.service.inserir(this.grupoDeValeta).subscribe((resp) => {
                    this.notifyService.showWarning('Atenção', 'Grupo de valeta inserido com sucesso');
                    this.reiniciarForm(form);
                    this.process = false;
                });
        }
    }

    reiniciarForm(form: FormGroup, codigoAtual?: number){
        this.submitted = false;

        if (codigoAtual){
            this.grupoDeValeta = new GrupoDeValeta(codigoAtual);
            form.reset(this.grupoDeValeta);
        } else {
            form.reset();
            this.iniciarCadastro();
        }
    }

    excluir(form: FormGroup){
        this.dialogConfirmService
            .confirm('Atenção', 'Deseja realmente excluir o grupo de valeta?')
            .subscribe(res => {
                if (res)
                    this.service.excluir(this.grupoDeValeta.id).subscribe(resp => {
                        this.notifyService.showWarning('Atenção', 'Grupo de valeta excluído com sucesso');
                        this.reiniciarForm(form);
                    });
            });
    }

    OnChange(){
        this.verificaChangeForm = true
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
}
