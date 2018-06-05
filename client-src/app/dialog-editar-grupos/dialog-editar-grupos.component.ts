import { Component,OnInit,Inject,ViewChild  } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormControl,FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';


import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';
import { GrupoDeFuncionarios } from './../models/grupo-de-funcionarios';
import { DialogEditarGruposService } from './dialog-editar-grupos.service'
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { AgrupamentoMecanicoService } from './../agrupamento-mecanico/agrupamento-mecanico.service';
import { AgrupamentoMecanicoComponent } from './../agrupamento-mecanico/agrupamento-mecanico.component';

import { DxSelectBoxComponent } from "devextreme-angular";

import * as rxjsNumeric from "rxjs/util/isNumeric";

import { Globals } from './../globals';
@Component({
  selector: 'app-dialog-editar-grupos',
  templateUrl: './dialog-editar-grupos.component.html',
  styleUrls: ['./dialog-editar-grupos.component.scss'],
  providers: [AgrupamentoMecanicoComponent, EmpresaFilialComponent]

})
export class DialogEditarGruposComponent implements OnInit {
  submitted: boolean = false;
  process = false;
  ativouCapsLock: boolean = false;
  grupoDeFuncionarios: GrupoDeFuncionarios;
  listaGrupos = [];
  dx = false;
  validationGrupoValid: boolean;
  validationGrupoDirty: boolean;
  grupoSelected: any;
  disableGrupo: boolean = true;
  disabledAdicionar: boolean = true;
  deleteSpinner: boolean = false;
  @ViewChild(DxSelectBoxComponent) dataGrid: DxSelectBoxComponent
  verificaChangeForm: boolean = false

  
  constructor(private dialogEditarGruposService: DialogEditarGruposService,
    private dialogRef: MdDialogRef<DialogEditarGruposService>,
    private globals: Globals,
    private agrupamentoMecanicoService: AgrupamentoMecanicoService,
    public dialogConfirmService: DialogConfirmService,
    public dialog: MdDialog,
    public notifyService: DialogResultErrorService,
    public agrupamentoMecanicoComponent: AgrupamentoMecanicoComponent,
    @Inject(DOCUMENT) doc: any) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('dialog-open')) {
        doc.body.classList.add('dialog-open');
      }
    });
    dialog.afterAllClosed.subscribe(() => {
      doc.body.classList.remove('dialog-open');
      this.agrupamentoMecanicoService.obterGrupoDeMecanicos()
    });
  }

  ngOnInit() {
    this.grupoDeFuncionarios = new GrupoDeFuncionarios();
    this.listarGruposDeFuncionarios()
  }

  salvarGrupo(form: FormGroup) {
    this.submitted = true;
  
    if (form.valid) {
      this.globals.processSpinner = true;
      this.dialogEditarGruposService.inserirGrupo(this.grupoDeFuncionarios).subscribe((resp) => {
        this.notifyService.showWarning('Atenção', 'Grupo de funcionário adicionado com sucesso');
        this.globals.processSpinner = false;
        this.listarGruposDeFuncionarios()
        this.ngOnInit()
        this.verificaChangeForm = false        
      },
      err => {
        this.ngOnInit()
      })
    }else{
      this.validationGrupoValid = false
      this.validationGrupoDirty = true
    }
  }



  excluir(form: FormGroup) {
    this.deleteSpinner = true;
    this.globals.processSpinner = false;
    this.dialogConfirmService
      .confirm('Atenção', 'Deseja realmente excluir o grupo de funcionário?')
      .subscribe(res => {
        if (res)
          this.dialogEditarGruposService.excluir(this.grupoSelected).subscribe(resp => {
              this.notifyService.showWarning('Atenção', 'Grupo de funcionário excluído com sucesso');
              this.listarGruposDeFuncionarios();
              form.reset()
              this.deleteSpinner = false;
            },
            err => {
              this.deleteSpinner = false;
            });
            else{
              this.disableGrupo = false;
              this.disabledAdicionar = true;
              this.deleteSpinner = false
            }
      });
  }

  listarGruposDeFuncionarios() {
    this.agrupamentoMecanicoService.obterGrupoDeMecanicos().subscribe((resp) => {
      this.process = false;
      this.listaGrupos = resp.data;
    })
  }

  displayGrupos(grupos) {
    if (!grupos) {
      return;
    } else {
      if (!grupos.descricao) {
        return grupos;
      } else {
        return grupos.descricao
      }
    }
  }


  addCustomItem(data) {
    var newItem = data.text;
    this.grupoDeFuncionarios.descricao = newItem;
  }

  onKeyPress(e) {
    this.validationGrupoValid = true;
    this.validationGrupoDirty = false;
    this.disabledAdicionar = false;
    this.disableGrupo = true;
  }

  onOptionChanged() {
    this.validationGrupoValid = true;
    this.validationGrupoDirty = false;
  }

  onValueChanged(e) {
    let isNumber = rxjsNumeric.isNumeric(e.value)

    if (isNumber) {
      this.disabledAdicionar = true;
      this.disableGrupo = false;
    } else {
      this.disabledAdicionar = false;
      this.disableGrupo = true;
    }
    this.grupoSelected = e.value;
  }

  OnChange(){
    this.verificaChangeForm = true
}

OnClose(){
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
