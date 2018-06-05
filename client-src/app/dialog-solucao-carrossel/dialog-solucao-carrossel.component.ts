import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Location, NgClass } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { SwiperComponent }from 'angular2-useful-swiper';

import { OSSolucaoCarrossel } from './../models/os-solucao-carrossel';
import { SolucaoDoDefeito } from './../models/solucao-do-defeito';
import { OSServicoFuncionario } from './../models/os-servico-funcionario';
import { FinalizarOSServico } from './../models/finalizar-os-servico';
import { FinalizarOSServicoFuncionario } from './../models/finalizar-os-servico-funcionario';
import { FinalizarOSDefeitoFuncionario } from './../models/finalizar-os-defeito-funcionario';
import { FinalizarOSDefeitoServico } from './../models/finalizar-os-defeito-servico';
import { FinalizarOSDefeito } from './../models/finalizar-os-defeito';
import { TrocaDeOleo } from './../models/troca-de-oleo';

import { DialogCadastroTipoOleoComponent } from './../dialog-cadastro-tipo-oleo/dialog-cadastro-tipo-oleo.component';
import { DialogSolucaoService } from './../dialog-solucao/dialog-solucao.service';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { DialogSolucaoCarouselService } from './dialog-solucao-carousel.service'



@Component({
  selector: 'app-dialog-solucao-carrossel',
  templateUrl: './dialog-solucao-carrossel.component.html',
  styleUrls: ['./dialog-solucao-carrossel.component.scss']
})

export class DialogSolucaoCarrosselComponent implements OnInit {
    solucoes: OSSolucaoCarrossel[] = [];
    osId: number;
    listaGruposServico = [];
    listaTiposDeOperacao = [];
    config: any  = {
        slidesPerView: 'auto',
        centeredSlides: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    };
    funcionarioId: number;
    veiculoId: number;
    senha: string;
    indexDialog = 0;
    verificaChangeForm: boolean = false
    spinnerCarrousel: boolean = false
    usuarioApontador: boolean = false

    @ViewChild('swiperSolucao')
    private swiperSolucao: SwiperComponent;

    constructor(
        private dialogRef: MdDialogRef<DialogSolucaoCarrosselComponent>,
        private dialog: MdDialog,
        private solucaoService: DialogSolucaoService,
        private dialogConfirmService: DialogConfirmService,
        public notifyService: DialogResultErrorService,
        private service: DialogSolucaoCarouselService,
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
        let funcionario = JSON.parse(localStorage.getItem('funcionario'));
        let solucao: OSSolucaoCarrossel;

        this.senha = funcionario.senha;

        if (this.data.servicosAFinalizar != null && this.data.servicosAFinalizar.length > 0){
            this.osId = this.data.osId;
            let servicosAFinalizar = this.data.servicosAFinalizar;
            this.funcionarioId = servicosAFinalizar[0].funcionarioId;
            this.veiculoId = servicosAFinalizar[0].veiculoId;

            for (let servico of servicosAFinalizar){
                solucao = new OSSolucaoCarrossel();

                if (servico.osServicoId > 0){
                    solucao.osServicoId = servico.osServicoId;
                    solucao.grupoServicoId = servico.grupoServicoId;
                    solucao.solucaoServicoId = servico.servicoId;
                    solucao.tipoDeOperacaoId = servico.tipoDeOperacaoId;
                    solucao.servico = servico.servico;
                    solucao.planoDeRevisaoId = servico.planoDeRevisaoId;
                }
                else{
                    solucao.osDefeitoId = servico.osDefeitoId;
                    solucao.defeito = servico.defeito;
                }

                this.solucoes.push(solucao);
            }
            this.ObterParametroApontador();
            this.obterGruposServico();
            this.obterTiposDeOperacao();
        }
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

    formValid(solucao: OSSolucaoCarrossel){
         if (solucao.osDefeitoId > 0){
            let solucaoJaAdicionada = solucao.solucoesDoDefeito.some(
                x => x.solucaoServicoId == solucao.solucaoServicoId);

            solucao.solucaoJaAdicionadaValid = !solucaoJaAdicionada;
        }

        return solucao.solucaoJaAdicionadaValid && solucao.grupoServicoValid && solucao.servicoValid && solucao.tipoDeOperacaoValid;
    }

    limparValidacoes(solucao: OSSolucaoCarrossel){
        solucao.submitted = false;
        solucao.grupoServicoValid = false;
        solucao.grupoServicoDirty = false;
        solucao.servicoValid = false;
        solucao.servicoDirty = false;
        solucao.tipoDeOperacaoValid = false;
        solucao.tipoDeOperacaoDirty = false;
        solucao.solucaoJaAdicionadaValid = true;
    }

    limparForm(form: FormGroup, solucao: OSSolucaoCarrossel){
        form.reset();
        this.limparValidacoes(solucao);
    }

    edicaoIncompleta(solucao: OSSolucaoCarrossel){
        return !this.formValid(solucao) && (solucao.grupoServicoDirty || solucao.servicoDirty || solucao.tipoDeOperacaoDirty ||
            (solucao.complemento != null && solucao.complemento.trim().length > 0) || solucao.submitted);
    }

    anteriorOuProximo(form: FormGroup, solucao: OSSolucaoCarrossel, anterior: boolean){
        let msg: string = "";
        let edicaoIncompleta: boolean = this.edicaoIncompleta(solucao);
        let exibirMsg: boolean = false;

        if (edicaoIncompleta || this.defeitoSemSolucaoAdicionada(solucao)){
            exibirMsg = true;
            msg = edicaoIncompleta ?
                'Existem campos obrigatórios não preenchidos. Deseja continuar?' :
                'A solução atual ainda não foi adicionada. Deseja ignorar e continuar?'
        }

         if (exibirMsg){
             this.dialogConfirmService
                .confirm('Atenção', msg)
                .subscribe(res => {
                    if (res){
                        form.reset();
                        this.limparValidacoes(solucao);
                        anterior ? this.swiperSolucao.swiper.slidePrev() : this.swiperSolucao.swiper.slideNext();
                        this.indexDialog = this.swiperSolucao.swiper.activeIndex;
                    }
                });
        } else{
            anterior ? this.swiperSolucao.swiper.slidePrev() : this.swiperSolucao.swiper.slideNext();

            this.indexDialog = this.swiperSolucao.swiper.activeIndex;
        }
    }

    defeitoSemSolucaoAdicionada(solucao: OSSolucaoCarrossel){
        return solucao.osDefeitoId > 0 && solucao.solucaoServicoId > 0 &&  !solucao.solucoesDoDefeito.some(
                x => x.solucaoServicoId == solucao.solucaoServicoId);
    }

    desabilitarCampos(){
        let habilitar = this.listaGruposServico.length > 0 &&
            this.listaTiposDeOperacao.length > 0;

        return !habilitar;
    }

    obterGruposServico(){
        this.solucaoService.obterGruposServico().subscribe((resp) => {
            this.listaGruposServico = resp.data;
        });
    };

    obterTiposDeOperacao(){
        this.solucaoService.obterTiposDeOperacao().subscribe((resp) => {
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

    changedGrupoServico(solucao: OSSolucaoCarrossel){
        this.verificaChangeForm = true
        this.obterServicos(solucao);
        solucao.grupoServicoValid = solucao.grupoServicoId > 0;
        solucao.grupoServicoDirty = true;

        if (!solucao.solucaoServicoId)
            solucao.solucaoServicoId = 0;

        solucao.solucaoJaAdicionadaValid = true;
    }

    changedServico(solucao: OSSolucaoCarrossel, evento){
        this.verificaChangeForm = true        
        solucao.servicoValid = solucao.solucaoServicoId > 0;
        solucao.servicoDirty = true;
        solucao.solucaoJaAdicionadaValid = true;
    }

    changedTipoDeOperacao(solucao: OSSolucaoCarrossel){
        this.verificaChangeForm = true        
        solucao.tipoDeOperacaoValid = solucao.tipoDeOperacaoId > 0;
        solucao.tipoDeOperacaoDirty = true;
    }

    obterServicos(solucao: OSSolucaoCarrossel){
        if (solucao.grupoServicoId > 0) {
            this.solucaoService.obterServicos(solucao.grupoServicoId).subscribe((resp) => {
                solucao.opcoesServicos = resp.data;
            });
		} else {
            solucao.opcoesServicos = [];
            solucao.solucaoServicoId = 0;
        }
    }

    deveExibirSolucoesDoDefeito(solucao: OSSolucaoCarrossel){
        if (solucao.osServicoId > 0)
            return false;

        return solucao.solucoesDoDefeito.length > 0;
    }

    deveExibirForm(solucao: OSSolucaoCarrossel){
        if (solucao.osServicoId > 0)
            return false;

        return solucao.solucoesDoDefeito.length > 0;
    }

    adicionarSolucaoDoDefeito(solucao: OSSolucaoCarrossel){
        solucao.submitted = true;

        if (!this.formValid(solucao))
            return;

        let grupoServico = this.listaGruposServico.filter(
            x => x.id == solucao.grupoServicoId).map(x => x.descricao).toString();

        let solucaoServico = solucao.opcoesServicos.filter(
            x => x.id == solucao.solucaoServicoId).map(x => x.descricao).toString();

        let tipoDeOperacao = this.listaTiposDeOperacao.filter(
            x => x.id == solucao.tipoDeOperacaoId).map(x => x.descricao).toString();


        let solucaoDoDefeito = new SolucaoDoDefeito(
                                    solucao.osDefeitoId,
                                    grupoServico,
                                    solucao.solucaoServicoId,
                                    solucaoServico,
                                    solucao.tipoDeOperacaoId,
                                    tipoDeOperacao,
                                    solucao.complemento);

        solucao.solucoesDoDefeito.push(solucaoDoDefeito);

        this.reiniciarFormDefeito(solucao);
        this.atualizarVisaoSolucoesDoDefeito(solucao);
    }

    removerSolucaoDoDefeito(solucao: OSSolucaoCarrossel, solucaoDoDefeito: OSSolucaoCarrossel){
        const index = solucao.solucoesDoDefeito.indexOf(solucaoDoDefeito);
        solucao.solucoesDoDefeito.splice(index, 1);

        if (solucao.solucoesDoDefeito.length == 0)
            this.atualizarVisaoSolucoesDoDefeito(solucao);
    }

    reiniciarFormDefeito(solucao: OSSolucaoCarrossel){
        solucao.grupoServicoId = 0;
        solucao.solucaoServicoId = 0;
        solucao.tipoDeOperacaoId = 0;
        solucao.complemento = null;

        this.limparValidacoes(solucao);
    }

    verSolucoesDoDefeito(solucao: OSSolucaoCarrossel){
        this.reiniciarFormDefeito(solucao);
        this.atualizarVisaoSolucoesDoDefeito(solucao);
    }

    atualizarVisaoSolucoesDoDefeito(solucao: OSSolucaoCarrossel) {
        solucao.exibeSolucoesDoDefeito = !solucao.exibeSolucoesDoDefeito;
    }

    gravarTodos(){
        let indiceAtual = this.swiperSolucao.swiper.activeIndex;
        let solucaoAtual = this.solucoes[indiceAtual];
        this.spinnerCarrousel = true            
        
        if (this.edicaoIncompleta(solucaoAtual)){
            solucaoAtual.submitted = true;
            return;
        }

        let osDefeitoSemSolucaoIds = this.solucoes.filter(
            x => x.osDefeitoId > 0 && x.solucoesDoDefeito.length == 0).map(x => x.osDefeitoId);

        let osServicoSemSolucaoIds = this.solucoes.filter(
            x => x.osServicoId > 0 && (!x.solucaoServicoId || !x.tipoDeOperacaoId)).map(x => x.osServicoId);

        let totalSemSolucao = osDefeitoSemSolucaoIds.length + osServicoSemSolucaoIds.length;
        if (totalSemSolucao > 0){
            let msg = totalSemSolucao == 1 ? 'Existe 1 solução pendente. ' : "Existem " + totalSemSolucao + " soluções pendentes. ";
            this.spinnerCarrousel = false            
            
            if(totalSemSolucao == this.solucoes.length){
                this.notifyService.showWarning('Atenção', 'Preencha ao menos um card para salvar');  
                this.posicionarSolucaoNaoInformada(osDefeitoSemSolucaoIds, osServicoSemSolucaoIds);
                this.spinnerCarrousel = false                   
            }
            else if(totalSemSolucao == 1 && this.solucoes.length == 1){
                this.notifyService.showWarning('Atenção', 'Preencha ao menos um card para salvar');  
                this.posicionarSolucaoNaoInformada(osDefeitoSemSolucaoIds, osServicoSemSolucaoIds);  
                this.spinnerCarrousel = false
                                            
            }else if (totalSemSolucao != this.solucoes.length){
                this.dialogConfirmService
                .confirm('Atenção', msg + "Deseja gravar mesmo assim?")
                .subscribe(res => {
                    if (res)
                        this.prepararGravacao();
                    else
                        this.posicionarSolucaoNaoInformada(osDefeitoSemSolucaoIds, osServicoSemSolucaoIds);
                        this.spinnerCarrousel = false            
                        
                });
            }
            
        } else {
            this.prepararGravacao();
        }
    }

    prepararGravacao(){
        let solucaoServicos = this.solucoes.filter(
            x => x.osServicoId > 0 && x.solucaoServicoId > 0 && x.tipoDeOperacaoId > 0);

        let solucaoDefeitos = this.solucoes.filter(
                x => x.osDefeitoId > 0 && x.solucoesDoDefeito.length > 0);

        if (solucaoServicos.length == 0) {
            this.confirmarGravacao(solucaoServicos, solucaoDefeitos);
        } else {
            let osServicoIds = solucaoServicos.map(x => x.osServicoId);

            this.obterTrocasDeOleoPendentes(osServicoIds).subscribe((resp) => {
                let trocasDeOleo: TrocaDeOleo[];

                if (resp.data && resp.data.length > 0){                               
                    trocasDeOleo = [];

                    for (let trocaDeOleo of resp.data){
                        trocasDeOleo.push(new TrocaDeOleo(
                                            this.osId,
                                            trocaDeOleo.planoDeRevisaoId,
                                            this.veiculoId,
                                            trocaDeOleo.tipoTrocaDeOleo,
                                            trocaDeOleo.oleoId,
                                            trocaDeOleo.quantidade));
                    }
                }

                this.confirmarGravacao(solucaoServicos, solucaoDefeitos, trocasDeOleo);
            });
        }
    }

    confirmarGravacao(solucaoServicos: OSSolucaoCarrossel[], solucaoDefeitos: OSSolucaoCarrossel[],
        trocasDeOleo?: TrocaDeOleo[]){

        if (trocasDeOleo != null){
            this.informarTrocaDeOleo(solucaoServicos, solucaoDefeitos, trocasDeOleo);
        } else {
            let requisicoes: Observable<any>[] = [];

            if (solucaoServicos.length > 0)
                requisicoes.push(this.confirmarGravacaoServicos(solucaoServicos));

            if (solucaoDefeitos.length > 0)
                requisicoes.push(this.confirmarGravacaoDefeitos(solucaoDefeitos));

            if (requisicoes.length > 0)
                Observable.forkJoin(requisicoes).subscribe(resp => this.dialogRef.close(true));
        }
    }

    informarTrocaDeOleo(solucaoServicos: OSSolucaoCarrossel[], solucaoDefeitos: OSSolucaoCarrossel[], trocasDeOleo: TrocaDeOleo[]){
        let finalizarOSServicoFuncionario = this.prepararGravacaoServicos(solucaoServicos);
        let finalizarOSDefeitoFuncionario: FinalizarOSDefeitoFuncionario;

        if (solucaoDefeitos.length > 0)
            finalizarOSDefeitoFuncionario = this.prepararGravacaoDefeitos(solucaoDefeitos);

        let tipoDeOleo = this.dialog.open(DialogCadastroTipoOleoComponent, {
            width: '550px',
            data: {
                finalizarOSServicoFuncionario: finalizarOSServicoFuncionario,
                finalizarOSDefeitoFuncionario: finalizarOSDefeitoFuncionario,
                trocasDeOleo: trocasDeOleo,
                veiculoId: this.veiculoId
            },
            disableClose:true
        });

        tipoDeOleo.afterClosed().subscribe((resp) => {
            this.spinnerCarrousel = false
            if(resp)
                this.dialogRef.close(true);
        });
    }

    obterTrocasDeOleoPendentes(osServicoIds: Number[]): Observable<any>{
        return this.solucaoService.trocasDeOleoPendentes(this.osId, osServicoIds)
    }

    confirmarGravacaoServicos(osSolucoesServicos: OSSolucaoCarrossel[]): Observable<any>{
        let finalizarOSServicoFuncionario = this.prepararGravacaoServicos(osSolucoesServicos);
        return this.solucaoService.finalizarServico(finalizarOSServicoFuncionario);
    }

    confirmarGravacaoDefeitos(osSolucoesDefeito : OSSolucaoCarrossel[]): Observable<any>{
        let finalizarOSDefeitoFuncionario = this.prepararGravacaoDefeitos(osSolucoesDefeito);
        return this.solucaoService.finalizarDefeito(finalizarOSDefeitoFuncionario);
    }

    prepararGravacaoServicos(osSolucoesServicos: OSSolucaoCarrossel[]){
        let osServicos: FinalizarOSServico[] = [];

        for (let osServico of osSolucoesServicos){
            osServicos.push(new FinalizarOSServico(
                osServico.osServicoId,
                osServico.solucaoServicoId,
                osServico.tipoDeOperacaoId,
                osServico.complemento));
        }

        let finalizarOSServicoFuncionario = new FinalizarOSServicoFuncionario(
            this.funcionarioId, osServicos, this.senha);

        return finalizarOSServicoFuncionario;
    }

    prepararGravacaoDefeitos(osSolucoesDefeito: OSSolucaoCarrossel[]){
        let osDefeitos: FinalizarOSDefeito[] = [];

        for (let osDefeito of osSolucoesDefeito){
            let osDefeitoServicos: FinalizarOSDefeitoServico[] = [];

            for (let solucaoDoDefeito of osDefeito.solucoesDoDefeito){
                osDefeitoServicos.push(new FinalizarOSDefeitoServico(
                    solucaoDoDefeito.solucaoServicoId,
                    solucaoDoDefeito.tipoDeOperacaoId,
                    solucaoDoDefeito.complemento));
            }

            osDefeitos.push(new FinalizarOSDefeito(osDefeito.osDefeitoId, osDefeitoServicos));
        }

        let finalizarOSDefeitoFuncionario = new FinalizarOSDefeitoFuncionario(
            this.funcionarioId, osDefeitos, this.senha);

        return finalizarOSDefeitoFuncionario;
    }

    posicionarSolucaoNaoInformada(osDefeitoSemSolucaoIds: number[], osServicoSemSolucaoIds: number[]){
        let posicao: number;

        if (osDefeitoSemSolucaoIds.length > 0){
            for (let i = 0; i < this.solucoes.length; i++){
                if (this.solucoes[i].osDefeitoId == osDefeitoSemSolucaoIds[0])
                    posicao = i;
            }
        } else {
            for (let i = 0; i < this.solucoes.length; i++){
                if (this.solucoes[i].osServicoId == osServicoSemSolucaoIds[0])
                    posicao = i;

            }
        }

        this.swiperSolucao.swiper.slideTo(posicao);
        this.indexDialog = this.swiperSolucao.swiper.activeIndex;
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
