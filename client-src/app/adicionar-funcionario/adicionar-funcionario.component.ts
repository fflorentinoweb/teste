import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

import { DialogAutenticacaoFuncionarioComponent } from '../dialog-autenticacao-funcionario/dialog-autenticacao-funcionario.component';
import { OSFuncionario } from './../models/os-funcionario';

@Component({
  selector: 'app-adicionar-funcionario',
  templateUrl: './adicionar-funcionario.component.html',
  styleUrls: ['./adicionar-funcionario.component.scss']
})
export class AdicionarFuncionarioComponent implements OnInit {
  osId:number = null;

  @Input() listaMecanicoActive: boolean;

  @Input()
  funcionarios = [];

  constructor(
    private dialog: MdDialog,     
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {
      this.osId = params['osId'];      
    });
  }

  public autenticarFuncionario() {
    this.dialog.open(DialogAutenticacaoFuncionarioComponent, {
      width: '650px',
      data: new OSFuncionario(this.osId),
      disableClose:true
    });
  }
}
