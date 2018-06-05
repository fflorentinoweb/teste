import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OsMecanicosService } from '../os-mecanicos/os-mecanicos.service';
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { OSServicoFuncionario } from './../models/os-servico-funcionario';
import { PausarOSServicoFuncionario } from './../models/pausar-os-servico-funcionario';
import { PausarOSDefeitoFuncionario } from './../models/pausar-os-defeito-funcionario';

import { OsMecanicosComponent } from './../os-mecanicos/os-mecanicos.component';
import { AcoesColetivasComponent } from './../acoes-coletivas/acoes-coletivas.component';

@Component({
  selector: 'app-pausar-todos-servicos',
  templateUrl: './pausar-todos-servicos.component.html',
  styleUrls: ['./pausar-todos-servicos.component.scss']
})
export class PausarTodosServicosComponent implements OnInit {
  funcionarioId: number;
  senha: string;
  public execucao = [];
  servicos: OSServicoFuncionario[] = [];

  @Input()
  set servicoEDefeitosEmExecucao(emExecucao: any[]) {
		this.execucao = (emExecucao);
  }
 
  get servicoEDefeitosEmExecucao(): any[] { return this.execucao; }

  @Output() 
  servicosPausados = new EventEmitter();

  constructor(
    private service: OsMecanicosService,
    private activatedRoute: ActivatedRoute,
    public notifyService: DialogResultErrorService,
    public osMecanicosComponent: OsMecanicosComponent,
    public acoesColetivasComponent: AcoesColetivasComponent) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.funcionarioId = params['funcionarioId'];
    });
        
    let funcionario = JSON.parse(localStorage.getItem('funcionario'));
    this.senha = funcionario.senha;
  }

  pausarTodosOsServicoEDefeitos(){
    let osServicoIds = this.execucao.filter(
          x => x.servico != null && x.status == 0 && x.emExecucao).map(x => x.osServicoId);

    let osDefeitoIds = this.execucao.filter(
          x => x.defeito != null && x.status == 0 && x.emExecucao).map(x => x.osDefeitoId); 

    if (osServicoIds.length == 0 && osDefeitoIds.length == 0){
        this.notifyService.showWarning('Atenção', "Não existe nenhum serviço ou defeito com status 'Em execução'");
        return;
    }

    this.osMecanicosComponent.showProcessAll(osServicoIds, osDefeitoIds);

    if (osServicoIds.length > 0){
        let body = new PausarOSServicoFuncionario(this.funcionarioId, osServicoIds, this.senha);
        this.service.pausarServicos(body).subscribe((resp) => {
            this.servicosPausados.emit()
            this.osMecanicosComponent.obterServicosParaFuncionarioParalelo()
            this.acoesColetivasComponent.VerificaAberto()
        });
    }

    if (osDefeitoIds.length > 0){
        let body = new PausarOSDefeitoFuncionario(this.funcionarioId, osDefeitoIds, this.senha);
        this.service.pausarDefeitos(body).subscribe((resp) => {
            this.servicosPausados.emit()
            this.osMecanicosComponent.obterServicosParaFuncionarioParalelo()
            this.acoesColetivasComponent.VerificaAberto()
        });
    }
  }
}
