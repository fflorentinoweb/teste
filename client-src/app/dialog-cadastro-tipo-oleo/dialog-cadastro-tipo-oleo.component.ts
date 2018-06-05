import { IniciarOSDefeitoFuncionario } from './../models/iniciar-os-defeito-funcionario';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';

import { OSServicoFuncionario } from './../models/os-servico-funcionario';
import { FinalizarOSServicoFuncionario } from './../models/finalizar-os-servico-funcionario';
import { FinalizarOSDefeitoFuncionario } from './../models/finalizar-os-defeito-funcionario';
import { TipoTrocaDeOleo } from './../enum/tipo-troca-de-oleo.enum';
import { TrocaDeOleo } from './../models/troca-de-oleo';

import { DialogCadastroTipoOleoService } from './dialog-cadastro-tipo-oleo.service';
import { DialogSolucaoService } from '../dialog-solucao/dialog-solucao.service';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";

import { Globals } from './../globals';

@Component({
  selector: 'app-dialog-cadastro-tipo-oleo',
  templateUrl: './dialog-cadastro-tipo-oleo.component.html',
  styleUrls: ['./dialog-cadastro-tipo-oleo.component.scss']
})
export class DialogCadastroTipoOleoComponent implements OnInit {
  trocasDeOleo: TrocaDeOleo[] = [];
  trocasDeOleoPorTipo: TrocaDeOleo[] = [];
  veiculoId: number;
  finalizarOSServicoFuncionario: FinalizarOSServicoFuncionario;
  finalizarOSDefeitoFuncionario: FinalizarOSDefeitoFuncionario;
  optionsOleos : string[];
  oleosCambio: any[];
  oleosDiferencial: any[];
  oleosMotor: any[];
  capacidadeLitrosCambio: number;
  capacidadeLitrosDiferencial: number;
  capacidadeLitrosMotor: number;
  submitted: boolean = false;
  process = false;
  saldo: number;
  descricaoTipoOleo: string;
  empresaAssociacaoId: number;
  verificaChangeForm: boolean = false;
  usuarioApontador: boolean = false;
  


  constructor(
    private dialog: MdDialog,
    public dialogRef: MdDialogRef<DialogCadastroTipoOleoComponent>,
    private service: DialogCadastroTipoOleoService,
    private serviceSolucaoService: DialogSolucaoService,
    public dialogConfirmService: DialogConfirmService,
    private globals: Globals,
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
    this.trocasDeOleo = this.data.trocasDeOleo;
    this.agrupaTrocasDeOleo();

    this.veiculoId = this.data.veiculoId;
    this.finalizarOSServicoFuncionario = this.data.finalizarOSServicoFuncionario;
    this.finalizarOSDefeitoFuncionario = this.data.finalizarOSDefeitoFuncionario;
    var options = Object.keys(TipoTrocaDeOleo);
    this.optionsOleos = options.slice(options.length / 2);
    this.ObterParametroApontador();
    this.carregarOleos();
    this.obterCapacidadeLitrosOleoPorIdVeiculo();
  }

  public ObterParametroApontador() {
    this.service.ObterParametroApontador().subscribe((resp) => {
      if (resp.data.apontadorParametro) {
        this.usuarioApontador = true
      } else {
        this.usuarioApontador = false
      }
    });
  }

  carregarOleos(){
    for (let trocaDeOleo of this.trocasDeOleoPorTipo){
      if(trocaDeOleo.tipoTrocaDeOleo != 3){
        this.obterOleosPorTipo(trocaDeOleo.tipoTrocaDeOleo);
      } else{
        this.obterOleosMotor();
      }
    }
  }

  obterOleosPorTipo(tipoTrocaDeOleo: TipoTrocaDeOleo){
    let AssocicaoId = JSON.parse(localStorage.getItem('empresaAssociacao'));
    this.empresaAssociacaoId = AssocicaoId.id
    this.service.ObterOleosPorTipo(this.empresaAssociacaoId, tipoTrocaDeOleo).subscribe((resp) =>{
      if (tipoTrocaDeOleo == TipoTrocaDeOleo.Cambio)
        this.oleosCambio = resp.data;
      else
        this.oleosDiferencial = resp.data;
    });
  }

  obterOleosMotor(){
    this.service.ObterOleosMotor(this.veiculoId).subscribe((resp) =>{
      this.oleosMotor = resp.data;
    });
  }

  dataSourceOleos(tipoTrocaDeOleo: TipoTrocaDeOleo){
    if (tipoTrocaDeOleo == TipoTrocaDeOleo.Cambio)
      return this.oleosCambio;
    else if (tipoTrocaDeOleo == TipoTrocaDeOleo.Diferencial)
      return this.oleosDiferencial;
    else
      return this.oleosMotor;
  }

  displayOleos(oleo) {
		if (!oleo)
			return;

		return oleo.codigo + " - " + oleo.descricao;
	}

  obterCapacidadeLitrosOleoPorIdVeiculo() {
      this.service.CarregarCapacidadeLitrosOleoPorIdVeiculo(this.veiculoId).subscribe((resp) => {
          for (let trocaDeOleo of this.trocasDeOleoPorTipo){
              if (trocaDeOleo.tipoTrocaDeOleo == TipoTrocaDeOleo.Cambio)
                  trocaDeOleo.capacidadeLitros = resp.data.capacidadeLitrosCambio;
              else if (trocaDeOleo.tipoTrocaDeOleo == TipoTrocaDeOleo.Diferencial)
                  trocaDeOleo.capacidadeLitros = resp.data.capacidadeLitrosDiferencial;
              else
                  trocaDeOleo.capacidadeLitros = resp.data.capacidadeLitrosMotor;
          }
      });
  }

  displayDescricao(trocaDeOleo: TrocaDeOleo){
    return this.optionsOleos[trocaDeOleo.tipoTrocaDeOleo];
  }

  verificarCampo(trocaDeOleoPorTipo: TrocaDeOleo){
      if(trocaDeOleoPorTipo.oleoId == undefined || trocaDeOleoPorTipo.oleoId == null){
          trocaDeOleoPorTipo.oleoValid = false;
      }else {
          trocaDeOleoPorTipo.oleoValid = true;
          trocaDeOleoPorTipo.oleoDirty = true;
      }
      this.verificaChangeForm = true;
      this.obterOleoPorId(trocaDeOleoPorTipo.oleoId);
  }

  obterOleoPorId(oleoId: number){
    this.service.ObterSaldoOleoPorId(oleoId).subscribe((resp) => {
      this.saldo = resp.data;
    });
  }

  agrupaTrocasDeOleo(){
    for (let trocaDeOleo of this.trocasDeOleo){
      if (!this.trocasDeOleoPorTipo.find(x => x.tipoTrocaDeOleo == trocaDeOleo.tipoTrocaDeOleo))
        this.trocasDeOleoPorTipo.push(trocaDeOleo);
    }
  }

  desagrupaTrocasDeOleo(){
    for (let trocaDeOleo of this.trocasDeOleo){
      if (!this.trocasDeOleoPorTipo.find(x => x.planoDeRevisaoId == trocaDeOleo.planoDeRevisaoId)){
        let trocaPorTipo = this.trocasDeOleoPorTipo.find(x => x.tipoTrocaDeOleo == trocaDeOleo.tipoTrocaDeOleo);
        trocaDeOleo.oleoId = trocaPorTipo.oleoId;
        trocaDeOleo.quantidade = trocaPorTipo.quantidade;
      }
    }
  }

  gravarTrocaDeOleo(){
    this.submitted = true;
    
    let itensInvalidos = this.trocasDeOleoPorTipo.filter(x => !x.quantidadeValid || !x.oleoValid || x.quantidade > this.saldo);
    if (itensInvalidos.length > 0)
      return;

    this.process = true;
    
    this.desagrupaTrocasDeOleo();

    this.finalizarOSServicoFuncionario.trocasDeOleo = this.trocasDeOleo;
    let requisicoes: Observable<any>[] = [];

    requisicoes.push(this.confirmarGravacaoServicos());

    if (this.finalizarOSDefeitoFuncionario)
        requisicoes.push(this.confirmarGravacaoDefeitos());

    Observable.forkJoin(requisicoes).subscribe(resp => this.dialogRef.close(true));
  }

  confirmarGravacaoServicos(): Observable<any>{
      return this.serviceSolucaoService.finalizarServico(this.finalizarOSServicoFuncionario);
  }

  confirmarGravacaoDefeitos(): Observable<any>{
      return this.serviceSolucaoService.finalizarDefeito(this.finalizarOSDefeitoFuncionario);
  }

  validaQuantidade(trocaDeOleo: TrocaDeOleo)
  {
      trocaDeOleo.saldo = this.saldo;
      trocaDeOleo.descricaoTipoOleo = trocaDeOleo.tipoTrocaDeOleo == 1 ? "câmbio"
                                    : trocaDeOleo.tipoTrocaDeOleo == 2 ? "diferencial" : "motor";

      trocaDeOleo.quantidadeValid = trocaDeOleo.quantidade != null && 
                                    trocaDeOleo.quantidade > 0 && 
                                    trocaDeOleo.quantidade <= trocaDeOleo.capacidadeLitros;
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