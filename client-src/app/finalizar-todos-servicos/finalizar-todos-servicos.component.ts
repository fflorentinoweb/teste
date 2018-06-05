import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DialogSolucaoCarrosselComponent } from './../dialog-solucao-carrossel/dialog-solucao-carrossel.component';
import { OsMecanicosService } from './../os-mecanicos/os-mecanicos.service';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { MdDialog } from '@angular/material';

import { OsMecanicosComponent } from './../os-mecanicos/os-mecanicos.component';
import { AcoesColetivasComponent } from './../acoes-coletivas/acoes-coletivas.component';

@Component({
  selector: 'app-finalizar-todos-servicos',
  templateUrl: './finalizar-todos-servicos.component.html',
  styleUrls: ['./finalizar-todos-servicos.component.scss']
})
export class FinalizarTodosServicosComponent implements OnInit {
  osId: number;
  funcionarioId: number;
  senha: string;  
  execucao = [];

  @Input()
  set servicoEDefeitosEmExecucao(emExecucao: any[]) {
		this.execucao = (emExecucao);
  }
 
  get servicoEDefeitosEmExecucao(): any[] { return this.execucao; }

  @Output() 
  servicosFinalizados = new EventEmitter();

  constructor(
    private service: OsMecanicosService,
    public dialogConfirmService: DialogConfirmService,
    public notifyService: DialogResultErrorService,
    private activatedRoute: ActivatedRoute,
    private dialog: MdDialog,
    public osMecanicosComponent: OsMecanicosComponent,
    public acoesColetivasComponent: AcoesColetivasComponent) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.osId = params['osId'];
        this.funcionarioId = params['funcionarioId'];
    });

    let funcionario = JSON.parse(localStorage.getItem('funcionario'));    
    this.senha = funcionario.senha;
  }

  finalizarTodosOsServicoEDefeitos(){
    let osServicos = this.execucao.filter(
      x=>x.servico != null && x.status == 0 && x.tempoExecucao != null);

    let osDefeitos = this.execucao.filter(
      x=>x.defeito != null && x.status == 0 && x.tempoExecucao !=null);

    if (osServicos.length == 0 && osDefeitos.length == 0){
        this.notifyService.showWarning('Atenção', "Não existe nenhum serviço ou defeito com status 'Em execução' ou 'Pausado'");
        return;
    }
    
    let servicosAFinalizar = osDefeitos.concat(osServicos);
    let dialogSolucaoCarrossel = this.dialog.open(DialogSolucaoCarrosselComponent, {
        data: {
            osId: Number(this.osId),
            servicosAFinalizar: servicosAFinalizar,
            disableClose:true
        }, 
        panelClass: 'dialog-panel-carrossel',
        disableClose:true
    });

    dialogSolucaoCarrossel.afterClosed().subscribe((resp) => {
      if (resp){
        this.servicosFinalizados.emit();
        this.osMecanicosComponent.obterServicosParaFuncionario();
        this.osMecanicosComponent.obterServicosParaFuncionarioParalelo()
        this.acoesColetivasComponent.VerificaAberto()
      }
    });
  }
}
