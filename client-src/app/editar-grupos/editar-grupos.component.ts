import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { DialogEditarGruposComponent } from './../dialog-editar-grupos/dialog-editar-grupos.component';
import { AgrupamentoMecanicoComponent } from './../agrupamento-mecanico/agrupamento-mecanico.component';




@Component({
  selector: 'app-editar-grupos',
  templateUrl: './editar-grupos.component.html',
  styleUrls: ['./editar-grupos.component.scss'],
  providers: [AgrupamentoMecanicoComponent]
})
export class EditarGruposComponent implements OnInit {

  dialogRef: MdDialogRef<DialogEditarGruposComponent>  

  constructor(public dialog: MdDialog, public agrupamentoMecanicoComponent: AgrupamentoMecanicoComponent) { }

  ngOnInit() {
  }

  dialogEditarGrupos(){
    this.dialogRef =  this.dialog.open(DialogEditarGruposComponent, {
      width: '380px',
      disableClose:true
    });   
  }

}
