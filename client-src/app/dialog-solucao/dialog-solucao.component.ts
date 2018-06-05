import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, NgClass } from '@angular/common';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

import { OSServicoFuncionario } from './../models/os-servico-funcionario';
import { OSSolucao } from './../models/os-solucao';
import { SolucaoDoDefeito } from './../models/solucao-do-defeito';
import { FinalizarOSServico } from './../models/finalizar-os-servico';
import { FinalizarOSDefeito } from './../models/finalizar-os-defeito';
import { FinalizarOSDefeitoServico } from './../models/finalizar-os-defeito-servico';
import { FinalizarOSServicoFuncionario } from './../models/finalizar-os-servico-funcionario';
import { FinalizarOSDefeitoFuncionario } from './../models/finalizar-os-defeito-funcionario';
import { TrocaDeOleo } from './../models/troca-de-oleo';

import { DialogCadastroTipoOleoComponent } from './../dialog-cadastro-tipo-oleo/dialog-cadastro-tipo-oleo.component';
import { DialogSolucaoService } from './dialog-solucao.service';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { DialogCadastroTipoOleoService } from '../dialog-cadastro-tipo-oleo/dialog-cadastro-tipo-oleo.service';

import { Globals } from './../globals';

@Component({
  selector: 'app-dialog-solucao',
  templateUrl: './dialog-solucao.component.html',
  styleUrls: ['./dialog-solucao.component.scss']
})

export class DialogSolucaoComponent implements OnInit{
    exibeSolucoes: boolean = false;
    submitted: boolean = false;
    solucoesDoDefeito: SolucaoDoDefeito[] = [];
    listaGruposServico = [];
	listaServicos = [];
    listaTiposDeOperacao = [];
    osSolucao: OSSolucao;
    senha: string;
    grupoServicoValid: boolean = false;
    grupoServicoDirty: boolean = false;
    servicoValid: boolean = false;
    servicoDirty: boolean = false;
    tipoDeOperacaoValid: boolean = false;
    tipoDeOperacaoDirty: boolean = false;
    finalizandoServico: boolean = true;
    solucaoJaAdicionadaValid: boolean = true;
    descricaoServicoDefeito: string;
    planoDeRevisaoId: number;
    osId: number;
    veiculoId: number;
    osServicoId: number;
    capacidadeLitrosCambio: number;
    capacidadeLitrosDiferencial: number;
    trocaDeOleo: TrocaDeOleo;
    verificouTrocaDeOleo: boolean = false;
    verificaChangeForm: boolean = false;
    usuarioApontador: boolean = false;

    constructor(
        private dialogRef: MdDialogRef<DialogSolucaoComponent>,
        private dialog: MdDialog,
        public dialogConfirmService: DialogConfirmService,
        private service: DialogSolucaoService,
        private dialogShow: DialogCadastroTipoOleoService,
        private globals: Globals,
        @Inject(DOCUMENT) doc: any,
        @Inject(MD_DIALOG_DATA) private data: OSServicoFuncionario) {
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
        this.planoDeRevisaoId = this.data.planoDeRevisaoId
        this.osId = this.data.osId;
        this.veiculoId = this.data.veiculoId;
        this.osServicoId = this.data.osServicoId;
        let funcionario = JSON.parse(localStorage.getItem('funcionario'));
        this.senha = funcionario.senha;
        this.finalizandoServico = this.data.osServicoId > 0;
        this.osSolucao = new OSSolucao();

        if (this.finalizandoServico){
            this.descricaoServicoDefeito = this.data.servico;
            this.osSolucao.osServicoId = this.data.osServicoId;
            this.osSolucao.grupoServicoId = this.data.grupoServicoId;
            this.osSolucao.solucaoServicoId = this.data.servicoId;
            this.osSolucao.tipoDeOperacaoId = this.data.tipoDeOperacaoId;
        } else {
            this.osSolucao.osDefeitoId = this.data.osDefeitoId;
            this.descricaoServicoDefeito = this.data.defeito;
        }

        this.ObterParametroApontador()
        this.obterTrocaDeOleoPendente();
        this.obterGruposServico();
        this.obterTiposDeOperacao();
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

    desabilitarCampos(){
        let habilitar = this.listaGruposServico.length > 0 &&
            this.listaTiposDeOperacao.length > 0;

        return !habilitar;
    }

	obterGruposServico(){
		this.service.obterGruposServico().subscribe((resp) => {
            this.listaGruposServico = resp.data;
		});
	};

	obterTiposDeOperacao(){
		this.service.obterTiposDeOperacao().subscribe((resp) => {
            this.listaTiposDeOperacao = resp.data;
		});
    };

	displayGruposServico(grupoServico) {
		return grupoServico ? grupoServico.codigo + " - " + grupoServico.descricao : null;
    }

    displayServicos(servico) {
        return servico ? servico.codigo + " - " + servico.descricao : null;
	}

    displayTiposDeOperacao(tipoDeOperacao) {
        return tipoDeOperacao ? tipoDeOperacao.codigo + " - " + tipoDeOperacao.descricao : null;
    }

    obterServicos(){
        if (this.osSolucao.grupoServicoId > 0) {
            this.service.obterServicos(this.osSolucao.grupoServicoId).subscribe((resp) => {
                this.listaServicos = resp.data;
            });
		} else {
            this.listaServicos = [];
            this.osSolucao.solucaoServicoId = 0;
        }
    }

    obterTrocaDeOleoPendente(){
        let osServicoIds: number[] = [this.osServicoId];
        this.service.trocasDeOleoPendentes(this.osId, osServicoIds).subscribe((resp) => {
            this.verificouTrocaDeOleo = true;
            if (resp.data != null && resp.data.length == 1){
                let trocaDeOleo = resp.data[0];
                this.trocaDeOleo = new TrocaDeOleo(
                    this.osId,
                    this.planoDeRevisaoId,
                    this.veiculoId,
                    trocaDeOleo.tipoTrocaDeOleo,
                    trocaDeOleo.oleoId,
                    trocaDeOleo.quantidade);
            }
        });
    }

    displayStatus(trocaDeOleo){
        return trocaDeOleo ? "Continuar" : "Finalizar";
    }

    confirmarServico(){
        this.submitted = true;

        if (!this.formValid())
            return;

        if(this.trocaDeOleo){
            this.cadastrarTipoDeOleo();
        } else{
            this.finalizar();
        }
    }

    confirmarDefeito(){
        let osDefeitoServicos: FinalizarOSDefeitoServico[] = [];
        let osDefeitos: FinalizarOSDefeito[] = [];

        for (let solucaoDefeito of this.solucoesDoDefeito){
            osDefeitoServicos.push(new FinalizarOSDefeitoServico(
                                        solucaoDefeito.solucaoServicoId,
                                        solucaoDefeito.tipoDeOperacaoId,
                                        solucaoDefeito.complemento));
        }

        osDefeitos.push(new FinalizarOSDefeito(
                            this.osSolucao.osDefeitoId,
                            osDefeitoServicos));

        let finalizarOSDefeitoFuncionario = new FinalizarOSDefeitoFuncionario(
            this.data.funcionarioId, osDefeitos, this.senha);

        this.service.finalizarDefeito(finalizarOSDefeitoFuncionario).subscribe((resp) => {
            this.dialogRef.close(true);
        });
    }

    confirmar(){
        if (this.finalizandoServico)
            this.confirmarServico();
        else
            this.confirmarDefeito();

    }

    changedGrupoServico(){
        this.verificaChangeForm = true;
        this.obterServicos();
        this.grupoServicoValid = this.osSolucao.grupoServicoId > 0;
        this.grupoServicoDirty = true;

        if (!this.osSolucao.solucaoServicoId)
            this.osSolucao.solucaoServicoId = 0;

        this.solucaoJaAdicionadaValid = true;
    }

    changedServico(){
        this.verificaChangeForm = true;
        this.servicoValid = this.osSolucao.solucaoServicoId > 0;
        this.servicoDirty = true;
        this.solucaoJaAdicionadaValid = true;
    }

    changedTipoDeOperacao(){
        this.verificaChangeForm = true;
        this.tipoDeOperacaoValid = this.osSolucao.tipoDeOperacaoId > 0;
        this.tipoDeOperacaoDirty = true;
    }

    formValid(){
        if (!this.finalizandoServico){
            let solucaoJaAdicionada = this.solucoesDoDefeito.some(
                x => x.solucaoServicoId == this.osSolucao.solucaoServicoId);

            this.solucaoJaAdicionadaValid = !solucaoJaAdicionada;
        }

        return this.solucaoJaAdicionadaValid && this.grupoServicoValid && this.servicoValid && this.tipoDeOperacaoValid;
    }

    adicionarSolucao(form: FormGroup) {
        this.submitted = true;

        if (!this.formValid())
            return;

        let grupoServico = this.listaGruposServico.filter(
            x => x.id == this.osSolucao.grupoServicoId).map(x => x.descricao).toString();

        let solucaoServico = this.listaServicos.filter(
            x => x.id == this.osSolucao.solucaoServicoId).map(x => x.descricao).toString();

        let tipoDeOperacao = this.listaTiposDeOperacao.filter(
            x => x.id == this.osSolucao.tipoDeOperacaoId).map(x => x.descricao).toString();

        let solucaoDoDefeito = new SolucaoDoDefeito(
                                    this.osSolucao.osDefeitoId,
                                    grupoServico,
                                    this.osSolucao.solucaoServicoId,
                                    solucaoServico,
                                    this.osSolucao.tipoDeOperacaoId,
                                    tipoDeOperacao,
                                    this.osSolucao.complemento);

        this.solucoesDoDefeito.push(solucaoDoDefeito);
        this.atualizarVisaoSolucoes();
    }

    reiniciarFormDefeito(){
        this.osSolucao = new OSSolucao();
        this.osSolucao.osDefeitoId = this.data.osDefeitoId;
        this.submitted = false;
        this.grupoServicoValid = false;
        this.grupoServicoDirty = false;
        this.servicoValid = false;
        this.servicoDirty = false;
        this.tipoDeOperacaoValid = false;
        this.tipoDeOperacaoDirty = false;
        this.solucaoJaAdicionadaValid = true;
        this.atualizarVisaoSolucoes();
    }

    removerSolucao(servico) {
        const index = this.solucoesDoDefeito.indexOf(servico);
        this.solucoesDoDefeito.splice(index, 1);

        if (this.solucoesDoDefeito.length == 0)
            this.reiniciarFormDefeito();
    }

    atualizarVisaoSolucoes() {
        this.exibeSolucoes = !this.exibeSolucoes;
    }

    finalizar(){
        let osServicos: FinalizarOSServico[] = [];


        osServicos.push(new FinalizarOSServico(
                            this.osSolucao.osServicoId,
                            this.osSolucao.solucaoServicoId,
                            this.osSolucao.tipoDeOperacaoId,
                            this.osSolucao.complemento)
                        );

        let finalizarOSServicoFuncionario = new FinalizarOSServicoFuncionario(
            this.data.funcionarioId, osServicos, this.senha);

        this.service.finalizarServico(finalizarOSServicoFuncionario).subscribe((resp) => {
            this.dialogRef.close(true);
        });
    }

    cadastrarTipoDeOleo() {

        let osServicos: FinalizarOSServico[] = [];

        osServicos.push(new FinalizarOSServico(
                            this.osSolucao.osServicoId,
                            this.osSolucao.solucaoServicoId,
                            this.osSolucao.tipoDeOperacaoId,
                            this.osSolucao.complemento)
                        );

        let finalizarOSServicoFuncionario = new FinalizarOSServicoFuncionario(
            this.data.funcionarioId, osServicos, this.senha);

        let trocasDeOleo: TrocaDeOleo[] = [];
        trocasDeOleo.push(this.trocaDeOleo);

        let tipoDeOleo = this.dialog.open(DialogCadastroTipoOleoComponent, {
            width: '550px',
            data: {
                finalizarOSServicoFuncionario: finalizarOSServicoFuncionario,
                trocasDeOleo: trocasDeOleo,
                veiculoId: this.veiculoId
            },
            disableClose:true
        });

        tipoDeOleo.afterClosed().subscribe((resp) => {
            if(resp)
                this.dialogRef.close(true);
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
