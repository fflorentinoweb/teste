import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OsMecanicosService } from '../os-mecanicos/os-mecanicos.service';
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { OSServicoFuncionario } from './../models/os-servico-funcionario';
import { IniciarOSServicoFuncionario } from './../models/iniciar-os-servico-funcionario';
import { IniciarOSDefeitoFuncionario } from './../models/iniciar-os-defeito-funcionario';

import { OsMecanicosComponent } from './../os-mecanicos/os-mecanicos.component';
import { AcoesColetivasComponent } from './../acoes-coletivas/acoes-coletivas.component';

@Component({
  selector: 'app-iniciar-todos-servicos',
  templateUrl: './iniciar-todos-servicos.component.html',
  styleUrls: ['./iniciar-todos-servicos.component.scss']
})
export class IniciarTodosServicosComponent implements OnInit {

  osId: number;
  funcionarioId: number;
  senha: string;
  execucao = [];
  servicos: OSServicoFuncionario[] = [];
  empresaAssociacaoId: number;

  @Input()
  set servicoEDefeitosEmExecucao(emExecucao: any[]) {
		this.execucao = (emExecucao);
  }
 
  get servicoEDefeitosEmExecucao(): any[] { return this.execucao; }

  @Output() 
  servicosIniciados = new EventEmitter();

  constructor(
    private service: OsMecanicosService,
    private activatedRoute: ActivatedRoute,
    public notifyService: DialogResultErrorService,
    public osMecanicosComponent: OsMecanicosComponent,
    public acoesColetivasComponent: AcoesColetivasComponent) { }

  ngOnInit() {
    let empresaAssociacao = JSON.parse(localStorage.getItem('empresaAssociacao'));
    this.empresaAssociacaoId = empresaAssociacao.id;

    this.activatedRoute.params.subscribe((params: Params) => {
        this.osId = params['osId'];
        this.funcionarioId = params['funcionarioId'];
    });
        
    let funcionario = JSON.parse(localStorage.getItem('funcionario'));
    this.senha = funcionario.senha;
  }

  iniciarTodosOsServicoEDefeitos(){    
    let osServicoIds = this.execucao.filter(
      x=>x.servico != null && x.status == 0 && !x.emExecucao).map(x=>x.osServicoId);

    let osDefeitoIds = this.execucao.filter(
      x => x.defeito != null && x.status == 0 && !x.emExecucao).map(x=>x.osDefeitoId);

    if (osServicoIds.length == 0 && osDefeitoIds.length == 0){
        this.notifyService.showWarning('Atenção', "Não existe nenhum serviço ou defeito com status 'Aberto' ou 'Pausado'");
        return;
    }

    this.osMecanicosComponent.showProcessAll(osServicoIds, osDefeitoIds);

    if (osServicoIds.length > 0){
        let body = new IniciarOSServicoFuncionario(this.funcionarioId, this.osId, this.empresaAssociacaoId, osServicoIds, this.senha);
        this.service.iniciarServicos(body).subscribe((resp) => {   
            this.servicosIniciados.emit();
            this.osMecanicosComponent.obterServicosParaFuncionarioParalelo()
            this.acoesColetivasComponent.VerificaAberto()
        });
    }

    if(osDefeitoIds.length > 0){
        let body = new IniciarOSDefeitoFuncionario(this.funcionarioId, this.osId, this.empresaAssociacaoId, osDefeitoIds, this.senha);
        this.service.iniciarDefeitos(body).subscribe((resp) => {
            this.servicosIniciados.emit();
            this.osMecanicosComponent.obterServicosParaFuncionarioParalelo()
            this.acoesColetivasComponent.VerificaAberto()          
        });
    }
  }
}
