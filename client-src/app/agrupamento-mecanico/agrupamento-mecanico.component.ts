import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition, query, stagger, keyframes } from '@angular/animations';


import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';

import { AgrupamentoMecanicoService } from './agrupamento-mecanico.service';
import { AgrupamentoMecanico } from '../models/agrupamento-mecanico'
import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';

import { GrupoDeFuncionarios } from './../models/grupo-de-funcionarios';
import { GrupoFuncionarioAssociacao } from './../models/grupo-funcionario-associacao';
import { MdIconButtonCssMatStyler } from '@angular/material';

@Component({
  selector: 'app-agrupamento-mecanico',
  templateUrl: './agrupamento-mecanico.component.html',
  styleUrls: ['./agrupamento-mecanico.component.scss'],
  // animations: [
  //   trigger('fadeInOut', [
  //     transition('void => *', [
  //       animate('300ms ease-in', keyframes([
  //         style({opacity: 0, transform: 'translateY(-35px)',  offset: 0.3}),
  //         style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
  //       ]))
  //     ])
  //   ])
  // ],
  providers: [EmpresaFilialComponent]

})
export class AgrupamentoMecanicoComponent implements OnInit {

  @Output() listaGrupos: AgrupamentoMecanico[]
  isDragging = false
  empresas: any
  empresaAssociacaoId: number
  grupoData: any;
  disabledGrupo: boolean = true
  disabledListas: boolean = true
  arr1: any = []
  arr2: any = []
  transferData: any
  @ViewChild('list1') list1: any
  @ViewChild('list2') list2: any

  constructor(private router: Router,
    public dragulaService: DragulaService,
    private agrupamentoMecanicoService: AgrupamentoMecanicoService,
    public empresaFilialComponent: EmpresaFilialComponent) {
  }

  ngOnInit() {
    this.getGaragens();

    this.dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });

    this.dragulaService.dropModel.subscribe((args: any) => {
      this.onDrop(args.slice(1));
      let [listName, el, target, source] = args;
        if (this.list1.nativeElement === source && this.list2.nativeElement === target) {
          let transferData: any = {
            funcionarioId: el.dataset.id
          }
          let grupoFuncionarioAssociacao = new GrupoFuncionarioAssociacao(transferData.funcionarioId, this.grupoData, this.empresaAssociacaoId);
          this.agrupamentoMecanicoService.inserirVinculoMecanico(grupoFuncionarioAssociacao).subscribe((resp) => {});
        } 
        if (this.list2.nativeElement === source && this.list1.nativeElement === target) {
          let transferData: any = {
            funcionarioId: el.dataset.id,
          }
          this.agrupamentoMecanicoService.deletarVinculoMecanico(transferData.funcionarioId, this.grupoData, this.empresaAssociacaoId).subscribe((resp) => {});
        }
    });
  }

  private onDrag(args) {
    let [e, el] = args;
  }

  private onDrop(args) {
    let [e, el] = args;
  }

  private add(item) {
    let grupoFuncionarioAssociacao = new GrupoFuncionarioAssociacao(item.id, this.grupoData, this.empresaAssociacaoId);
    this.agrupamentoMecanicoService.inserirVinculoMecanico(grupoFuncionarioAssociacao).subscribe((resp) => {
      var indice = this.arr1.indexOf(item);
      this.arr1.splice(indice, 1);
      this.arr2.push(item);
    });
  }

  private remove(item) {
    this.agrupamentoMecanicoService.deletarVinculoMecanico(item.id, this.grupoData, this.empresaAssociacaoId).subscribe((resp) => {
      var indice = this.arr2.indexOf(item);
      this.arr2.splice(indice, 1);
      this.arr1.push(item);
    });
  }


  getGaragens() {
    this.empresaFilialComponent.obterGaragem().subscribe((resp) => {
      this.empresas = resp;
    });
  }

  handleValueUpdated(value, form: FormGroup) {
    this.empresaAssociacaoId = value;
    this.obterGrupoFuncionario();
    this.reiniciarForm(form)
    this.disabledGrupo = false

    if (this.grupoData) {
      this.ObterFuncionariosMuiltEmpresa(this.grupoData, this.empresaAssociacaoId);
      this.ObterFuncionario(this.empresaAssociacaoId);
    }
  }

  obterGrupoFuncionario() {
    this.agrupamentoMecanicoService.obterGrupoDeMecanicos().subscribe((resp) => {
      this.listaGrupos = resp.data
    })
  }

  ObterFuncionario(value) {
    this.agrupamentoMecanicoService.ObterFuncionarioPorEmpresaAssociacao(value, this.grupoData).subscribe((resp) => {
      this.arr1 = resp.data
    })
  }

  ObterFuncionariosMuiltEmpresa(idGrupo, associacaoId) {
    this.agrupamentoMecanicoService.ObterFuncionariosPorGrupoIdEEmpresaAssociacaoId(idGrupo, associacaoId).subscribe((resp) => {
      this.arr2 = resp.data
      var i;
      for (i = 0; i < this.arr2.length; i++) {
        this.arr2[i].id = this.arr2[i]['funcionarioId'];
        delete this.arr2[i].funcionarioId;
      }
    })
  }

  displayGrupoMecanicos(listaGrupos) {
    if (!listaGrupos)
      return;
    return listaGrupos.descricao;
  }

  atualizaSelecaoMecanicos(data) {
    this.grupoData = data.value;
    this.ObterFuncionariosMuiltEmpresa(this.grupoData, this.empresaAssociacaoId);
    this.ObterFuncionario(this.empresaAssociacaoId);
    this.disabledListas = false
  }

  reiniciarForm(form: FormGroup) {
    form.reset();
    this.arr1 = []
    this.arr2 = []
  }

  onOpened(){
    this.obterGrupoFuncionario()
  }
}
