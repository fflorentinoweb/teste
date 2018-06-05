import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogEncerramentoOsPendenciaComponent } from '../dialog-encerramento-os-pendencia/dialog-encerramento-os-pendencia.component';
import { DialogAutenticacaoFuncionarioComponent } from '../dialog-autenticacao-funcionario/dialog-autenticacao-funcionario.component';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";

import { ExecucaoDaOsService } from './execucao-da-os.service';
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { VeiculoValeta } from "../models/veiculo-valeta";
import { ParametrosOs } from "../models/parametros-os";
import { PainelExecucaoOs } from "../models/painel-execucao-os";
import { PausarOuFinalizar } from "../enum/pausar-ou-finalizar.enum";
import { PausarOuFinalizarOs } from './../models/pausar-ou-finalizar-os';

import { routerTransition } from './../router.transition';

@Component({
	selector: 'app-execucao-da-os',
	templateUrl: './execucao-da-os.component.html',
	styleUrls: ['./execucao-da-os.component.scss'],
	host: {
		'[@slideInOutAnimation]': ''
	},
	animations:[routerTransition]
})
export class ExecucaoDaOsComponent implements OnInit {
	dialogRef: MdDialogRef<DialogAutenticacaoFuncionarioComponent>;
	dialogRefPendencia: MdDialogRef<DialogEncerramentoOsPendenciaComponent>;

	osId:number = null;
	painelExecucaoOS: PainelExecucaoOs;
	valetaId: number;
	veiculoId: number;
	funcionarios = [];
	tempoExecucao: string;
	emExecucao: boolean;
	activeMechanicsList: boolean;
	botaoRevogar: boolean;

  	constructor(
	  private dialog: MdDialog,
	  private router: Router,
	  private service: ExecucaoDaOsService,
	  private activatedRoute: ActivatedRoute,
	  private dialogConfirmService: DialogConfirmService,
	  private notifyService: DialogResultErrorService) {
	}

  	ngOnInit() {
		this.painelExecucaoOS = new PainelExecucaoOs();

		this.activatedRoute.params.subscribe((params: Params) => {
			this.osId = params['osId'];
			this.ObterPainelExecucaoOS(this.osId);
		});
	}

	atualizarPainelExecucaoOS(){
		this.ObterPainelExecucaoOS(this.osId);
	}

	ObterPainelExecucaoOS(osId){
		this.service.ObterOsPainelExecucao(osId).subscribe((resp) => {
			this.painelExecucaoOS = resp.data;
			this.valetaId = resp.data.valetaId;
			this.veiculoId = resp.data.veiculoId;
			this.funcionarios = resp.data.funcionarios;
			this.tempoExecucao = resp.data.tempoExecucao;
			this.emExecucao = resp.data.emExecucao;
			this.botaoRevogar = resp.data.botaoRevogar;
			localStorage.setItem('botaoRevogar', JSON.stringify({ botaoRevogar: this.botaoRevogar }));			
		});
	}

	obterServicosFinalizados(){
		this.service.ObterServicosFinalizado(this.osId).subscribe((resp) => {
			let msg = resp.data == 1 ? 'OS não pode ser finalizada no momento, pois possui serviços em execução.' : resp.data == 2 ? 'Existem serviços pendentes na OS, deseja finalizar mesmo assim?' : 'Deseja finalizar a OS?'

			if(resp.data == 1){
				this.notifyService.showWarning('Atenção', msg);
			}else{
				this.dialogConfirmService
				.confirm('Atenção', msg)
				.subscribe(resDialog => {
					if(resDialog){
						if(resp.data == 2)
							this.pendencias();
						else
							this.finalizar();
					}
				});
			}
		});
	}

	pendencias(){
		this.dialogRefPendencia = this.dialog.open(DialogEncerramentoOsPendenciaComponent, {
			width: '460px',
			data: {
				osId: this.osId,
				veiculoId: this.veiculoId,
				valetaId: this.valetaId				
			},
			disableClose:true
		});
	}

	finalizar() {
		this.dialogRef = this.dialog.open(DialogAutenticacaoFuncionarioComponent, {
			width: '650px',
			data: new PausarOuFinalizarOs(this.osId, PausarOuFinalizar.Finalizar),
			disableClose:true
		});

		this.dialogRef.afterClosed().subscribe((resp) => {
			if (resp){
				this.dialogConfirmService
				.confirm('Atenção', 'Deseja retirar o veículo da valeta?')
				.subscribe(res => {
					var empresaAssociacao = JSON.parse(localStorage.getItem('empresaAssociacao'));
					if (res) {
						let veiculoValeta = new VeiculoValeta({
							veiculoId: this.veiculoId,
							valetaId: this.valetaId
						});
						this.service.patchRetirarVeiculoValeta(veiculoValeta).subscribe((resp) => {
                            this.router.navigate(['./AlocacaoOsVeiculo/' + empresaAssociacao.id]);
						});	
					} else {
                        this.notifyService.showWarning('Atenção', 'O veículo permanecerá alocado na valeta até que seja retirado.');
                        this.router.navigate(['./AlocacaoOsVeiculo/' + empresaAssociacao.id]);
					}
				});
			}
		});
	}


	RetirarVeiculoValeta(){
		let veiculoValeta = new VeiculoValeta({
		veiculoId: this.veiculoId,
		valetaId: this.valetaId
		});

		this.service.ObterOSServicosEmExecucao(this.veiculoId).subscribe((resp) => {
			const retorno = resp.data;
			var str = retorno.join(", ");
			let msg = resp.data.length > 0 ? 'Existem serviços em execução na (s)OS: ' + str + '. Ao retirar o veículo eles serão pausados. Deseja prosseguir?': 'Deseja realmente retirar o veículo da valeta?';
			
			this.dialogConfirmService
			.confirm('Atenção', msg)
			.subscribe(resDialog => {
				if(resDialog){
					this.retirarVeiculo(veiculoValeta);
				}
			});
		});
	}

	retirarVeiculo(veiculoValeta){
		this.service.patchRetirarVeiculoValeta(veiculoValeta).subscribe((resp) => {
			var empresaAssociacao = JSON.parse(localStorage.getItem('empresaAssociacao'));
			this.router.navigate(['./AlocacaoOsVeiculo/' + empresaAssociacao.id]);
		});
	}

	handleValueUpdated(value){
		this.activeMechanicsList = value;
	}
}


