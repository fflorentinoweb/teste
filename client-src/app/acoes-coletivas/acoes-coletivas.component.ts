import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-acoes-coletivas',
  templateUrl: './acoes-coletivas.component.html',
  styleUrls: ['./acoes-coletivas.component.scss']
})
export class AcoesColetivasComponent {
  public execucao = []
  public execucaoParalelo = []

  public servicosAbertos: any
  public todosServicosAbertos: boolean = false
  public servicosComSolucao: any
  public todosServicosFinalizados: boolean = false
  public servicosPausados: any
  public servicosEmExecucao: any

  public hideAcoes: boolean = false
  public mostrarApenasIniciar: boolean = false
  public esconderIniciar: boolean = false
  public hideInside: boolean = false

  public existeFinalizado: boolean = false;
  public existePausado: boolean = false;
  public existeEmExecucao: boolean = false;

  @Output()
  statusDisabledFinalizado = new EventEmitter();

  @Output()
  hideBotes = new EventEmitter()

  @Output()
  servicosAtualizados = new EventEmitter();

  @Output()
  servicosFinalizados = new EventEmitter();

  @Input()
  set servicoEDefeitosEmExecucao(emExecucao: any[]) {
    this.execucao = (emExecucao);
  }

  @Input()
  set servicoEDefeitosEmExecucaoParalelo(emExecucaoParalelo: any[]) {
    this.execucaoParalelo = (emExecucaoParalelo);
    this.VerificaAberto()
  }

  get servicoEDefeitosEmExecucao(): any[] {
    return this.execucao;
  }

  get servicoEDefeitosEmExecucaoParalelo(): any[] {
    return this.execucaoParalelo;
  }

  constructor() {}

  ngOnInit() {
    this.VerificaAberto()
  }

  notificarServicosAtualizados() {
    this.servicosAtualizados.emit();
  }

  notificarServicosFinalizados() {
    this.servicosFinalizados.emit();
  }


  VerificaAberto() {

    this.servicosAbertos = this.execucaoParalelo.filter(item => !item.emExecucao && item.status == 0 && item.tempoExecucao == null).map(x => x.status);
    this.servicosComSolucao = this.execucaoParalelo.filter(item => item.status == 1).map(x => x.status)
    this.servicosPausados = this.execucaoParalelo.filter(item => !item.emExecucao && item.status == 0 && item.tempoExecucao != null).map(x => x.status)
    this.servicosEmExecucao = this.execucaoParalelo.filter(item => item.emExecucao).map(x => x.status)

    if (this.execucaoParalelo.length == this.servicosAbertos.length) {
      this.todosServicosAbertos = true
    } else {
      this.todosServicosAbertos = false
    }

    if (this.execucaoParalelo.length == this.servicosComSolucao.length) {
      this.todosServicosFinalizados = true
    } else {
      this.todosServicosFinalizados = false
    }

    if(this.servicosComSolucao.length > 0){
      this.existeFinalizado = true
    }

    if (this.servicosPausados.length > 0) {
      this.existePausado = true
    } else {
      this.existePausado = false
    }

    if (this.servicosEmExecucao.length > 0) {
      this.existeEmExecucao = true
    } else {
      this.existeEmExecucao = false
    }

    if (this.servicosComSolucao.length > 0 && !this.existePausado && !this.existeEmExecucao) {
      this.mostrarApenasIniciar = true
      this.hideBotes.emit(this.mostrarApenasIniciar)
    }

    if (this.todosServicosAbertos) {
      this.mostrarApenasIniciar = true
      this.hideBotes.emit(this.mostrarApenasIniciar)
    } else if (this.todosServicosFinalizados) {
      this.hideAcoes = true
      this.statusDisabledFinalizado.emit(this.hideAcoes)
    } else if (this.existePausado || this.existeEmExecucao) {
      this.mostrarApenasIniciar = false
      this.hideBotes.emit(this.mostrarApenasIniciar)
    }
    
    
    if (this.existePausado && this.existeFinalizado && !this.existeEmExecucao){
      this.hideAcoes = false
      this.statusDisabledFinalizado.emit(this.hideAcoes)
    }

  }

}
