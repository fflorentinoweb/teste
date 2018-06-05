import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { TabsOverviewService } from './tabs-overview.service';
import { ExecucaoDaOsService } from '../execucao-da-os/execucao-da-os.service';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { VeiculoValeta } from "../models/veiculo-valeta";
import { OsVeiculoValeta } from "../models/os-veiculo-valeta";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-tabs-overview',
  templateUrl: './tabs-overview.component.html',
  styleUrls: ['./tabs-overview.component.scss']
})
export class TabsOverviewComponent implements OnInit, OnDestroy {
	garagemId: number = null;
	listaOS = [];
	listaVeiculos = [];
  listaValetas = [];
  valetasDisponiveis = [];
	osIdMecanico: number;
	veiculoIdMecanico: number;
	valetaIdMecanico: number;
	entradaJaRegistradaMecanico: boolean = false;
	veiculoIdManobrista: number;
	valetaIdManobrista: number;
	disabledValetaMecanico: boolean = true;
	disabledValetaManobrista: boolean = true;
	valetaExistenteManobrista: boolean = false;
	osAssociada: boolean = false;
	getObterOS: any;
	getObterVeiculos: any;
	getObterValetas: any;

	timerObterOS: any;
	timerObterVeiculos: any;
	timerObterValetas: any;

	constructor(
		private router: Router,
		private service: TabsOverviewService,
		private servicoExecucao: ExecucaoDaOsService,
		public notifyService: DialogResultErrorService,
		private dialogConfirmService: DialogConfirmService,
		private activatedRoute: ActivatedRoute) {

		}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.garagemId = params['garagemId'];

			this.obterOS(this.garagemId);
      this.obterVeiculos(this.garagemId);
      this.obterValetas(this.garagemId)
		});
	}

	ngOnDestroy(): void {
		if (this.getObterOS) {
			this.getObterOS.unsubscribe();
		}
		if (this.getObterVeiculos) {
			this.getObterVeiculos.unsubscribe();
		}
		if (this.getObterValetas) {
			this.getObterValetas.unsubscribe();
		}


		if (this.timerObterOS) {
			this.timerObterOS.unsubscribe();
		}
		if (this.timerObterVeiculos) {
			this.timerObterVeiculos.unsubscribe();
		}
		if (this.timerObterValetas) {
			this.timerObterValetas.unsubscribe();
		}
	}

	obterOS(garagemId){
		this.getObterOS = this.service.obterOS(garagemId).subscribe((resp) => {
			this.listaOS = resp.data;
			this.timerObterOS = Observable.timer(30000).first().subscribe(() => this.obterOS(this.garagemId));
		});
	};

	obterVeiculos(garagemId){
		this.getObterVeiculos = this.service.obterVeiculos(garagemId).subscribe((resp) => {
			this.listaVeiculos = resp.data;
      this.timerObterVeiculos = Observable.timer(30000).first().subscribe(() => this.obterVeiculos(this.garagemId));

		});
	};

	obterValetas(garagemId){
		this.getObterValetas = this.service.obterValetas(garagemId).subscribe((resp) => {
      this.listaValetas = resp.data;
      // this.timerObterValetas = Observable.timer(30000).first().subscribe(() => this.obterValetas(this.garagemId))
		});
	};

	displayOS(os) {
		if (!os)
			return;

		let tipo: string = os.tipo == 0 ? 'Corretiva' : 'Preventiva';
		return os.numero + " (" + tipo + ") - " + os.veiculo.prefixo;
	}

	displayVeiculos(veiculo) {
		return veiculo ? veiculo.prefixo + " - " + veiculo.placa : null;
	}

	displayValetas(valeta) {

		if (!valeta)
      return;

		let tipo: string = valeta.tipo == 0 ? 'Física' : 'Virtual';
		return valeta.codigo + " - " + valeta.descricao + " (" + tipo + ")";
	}

	disabledEntrarMecanico(){
		return (!(this.osIdMecanico > 0 && this.veiculoIdMecanico > 0 && this.valetaIdMecanico > 0));
	}

	disabledEntrarManobrista(){
		return (!(this.veiculoIdManobrista > 0 && this.valetaIdManobrista > 0));
	}

	carregarVeiculoValetaMecanico(){
    this.obterValetas(this.garagemId);

		this.veiculoIdMecanico = null;
		this.entradaJaRegistradaMecanico = false;
		this.osAssociada = false;
		this.valetaIdMecanico = null;
		this.disabledValetaMecanico = true;

		if (this.osIdMecanico > 0) {
			this.service.obterOSValetaAtualPorOS(this.osIdMecanico).subscribe((resp) => {
				let os = resp.data;
				this.veiculoIdMecanico = os.veiculoId;
				this.entradaJaRegistradaMecanico = os.veiculoAssociado;
				this.osAssociada = os.osAssociada;

				if (os.valetaId > 0){
          this.valetaIdMecanico = os.valetaId;
        }
				else{
          this.disabledValetaMecanico = false;
          this.valetasDisponiveis = [];


          for (var i = 0; i < this.listaValetas.length; i++){
            if(this.listaValetas[i].valetaDisponivel){
               this.valetasDisponiveis.push(this.listaValetas[i]);
            }
          }
          this.listaValetas = this.valetasDisponiveis;
        }

			})
    };
	}

	carregarValetaManobrista(){
    this.valetaIdManobrista = null;
		this.disabledValetaManobrista = true;
    this.valetaExistenteManobrista = false;


		if (this.veiculoIdManobrista > 0) {
			this.service.ObterIdValetaAtualPorVeiculoId(this.veiculoIdManobrista).subscribe((resp) => {
				let valetaAtual = resp.data;

				if (valetaAtual){
					this.valetaIdManobrista = valetaAtual;
					this.valetaExistenteManobrista = true;
				} else{
          this.disabledValetaManobrista = false;
          this.valetasDisponiveis = []
          for (var i = 0; i < this.listaValetas.length; i++){
            if(this.listaValetas[i].valetaDisponivel){
               this.valetasDisponiveis.push(this.listaValetas[i]);
            }
          }
          this.listaValetas = this.valetasDisponiveis;
        }
			})
		};
	}

	entrarMecanico(){

		if (this.osAssociada){
			this.proximaTela();
			return;
		}

		let osVeiculoValeta = new OsVeiculoValeta({
			osId: this.osIdMecanico,
			veiculoId: this.veiculoIdMecanico,
			valetaId: this.valetaIdMecanico
		});

		if (this.disabledValetaMecanico && !this.entradaJaRegistradaMecanico && !this.osAssociada)
			this.associarOSAValeta(osVeiculoValeta);
		else
			this.entrar(osVeiculoValeta);

	}

	entrarManobrista(){
		let osVeiculoValeta = new VeiculoValeta({
			veiculoId: this.veiculoIdManobrista,
			valetaId: this.valetaIdManobrista
		});
		this.service.entrar(osVeiculoValeta).subscribe((resp) => {
			this.recarregarVisaoManobrista();
			this.recarregarVisaoMecanico();

      this.notifyService.showWarning('Atenção', 'Veículo alocado na valeta');
      this.obterValetas(this.garagemId)
		});
	}

	entrar(osVeiculoValeta: OsVeiculoValeta){
		this.service.entrar(osVeiculoValeta).subscribe((resp) => {
			this.proximaTela();
		});
	}

	associarOSAValeta(osVeiculoValeta: OsVeiculoValeta){
		this.service.associarOSAValeta(osVeiculoValeta).subscribe((resp) => {
			this.proximaTela();
		});
	}

	retirarManobrista(){
		this.servicoExecucao.ObterOSServicosEmExecucao(this.veiculoIdManobrista).subscribe((resp) => {
			const retorno = resp.data;
			var str = retorno.join(", ");
			let msg = resp.data.length > 0 ? 'Existem serviços em execução na(s) OS: ' + str + '. Ao retirar o veículo eles serão pausados. Deseja prosseguir?': 'Deseja realmente retirar o veículo da valeta?';

			this.dialogConfirmService
			.confirm('Atenção', msg)
			.subscribe(resDialog => {
				if(resDialog)
					this.retirarVeiculo();
			});
		});
	}

	retirarVeiculo(){
		let veiculoValeta = new VeiculoValeta({
			veiculoId: this.veiculoIdManobrista,
			valetaId: this.valetaIdManobrista
		});

		this.service.retirar(veiculoValeta).subscribe((resp) => {
			this.recarregarVisaoManobrista();
			this.recarregarVisaoMecanico();

      this.notifyService.showWarning('Atenção', 'Veículo retirado da valeta');
      this.obterValetas(this.garagemId)

		});
	}
	recarregarVisaoMecanico(){
		this.osIdMecanico = null;
		this.veiculoIdMecanico = null;
		this.entradaJaRegistradaMecanico = false;
		this.osAssociada = false;
		this.valetaIdMecanico = null;
		this.disabledValetaMecanico = true;
	}

	recarregarVisaoManobrista(){
		this.veiculoIdManobrista = null
		this.valetaIdManobrista = null;
		this.disabledValetaManobrista = true;
		this.valetaExistenteManobrista = false;
	}

	proximaTela(){
		this.router.navigate(['./ExecucaoDaOs/' + this.osIdMecanico]);
	}
}
