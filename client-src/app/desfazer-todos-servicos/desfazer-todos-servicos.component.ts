import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OsMecanicosService } from '../os-mecanicos/os-mecanicos.service';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { OsMecanicosComponent } from './../os-mecanicos/os-mecanicos.component';
import { AcoesColetivasComponent } from './../acoes-coletivas/acoes-coletivas.component';

@Component({
  selector: 'app-desfazer-todos-servicos',
  templateUrl: './desfazer-todos-servicos.component.html',
  styleUrls: ['./desfazer-todos-servicos.component.scss']
})
export class DesfazerTodosServicosComponent implements OnInit {
  funcionarioId: number;
  senha: string;  
  execucao = [];

  @Input()
  set servicoEDefeitosEmExecucao(emExecucao: any[]) {
		this.execucao = (emExecucao);
  }

  @Output() 
  servicosDesfeitos = new EventEmitter();
 
  get servicoEDefeitosEmExecucao(): any[] { return this.execucao; }

  constructor(
    private service: OsMecanicosService,
    public dialogConfirmService: DialogConfirmService,
    public notifyService: DialogResultErrorService,
    private activatedRoute: ActivatedRoute,
    public osMecanicosComponent: OsMecanicosComponent,
    public acoesColetivasComponent: AcoesColetivasComponent) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.funcionarioId = params['funcionarioId'];
    });

    let funcionario = JSON.parse(localStorage.getItem('funcionario'));    
    this.senha = funcionario.senha;
  }

  desfazerTodosOsServicoEDefeitos(){
    let osServicoIds = this.execucao.filter(
      x=>x.servico != null && x.status == 0 && x.tempoExecucao != null).map(x=>x.osServicoId);

    let osDefeitoIds = this.execucao.filter(
      x=>x.defeito != null && x.status == 0 && x.tempoExecucao !=null).map(x=>x.osDefeitoId);

    if (osServicoIds.length == 0 && osDefeitoIds.length == 0){
        this.notifyService.showWarning('Atenção', "Por favor, selecione ao menos um serviço ou defeito com status 'Em execução' ou 'Pausado'");
        return;
    }

    this.dialogConfirmService
    .confirm('Atenção', 'Deseja realmente desfazer a execução?')
      .subscribe(res => {
        if(res){
            this.osMecanicosComponent.showProcessAllDesfazer(osServicoIds, osDefeitoIds);

            if (osServicoIds.length > 0){
              this.service.desfazerServicos(this.funcionarioId, osServicoIds, this.senha).subscribe((resp) => {
                this.servicosDesfeitos.emit();
                this.osMecanicosComponent.obterServicosParaFuncionarioParalelo()
                this.acoesColetivasComponent.VerificaAberto()
              });
            }

            if (osDefeitoIds.length > 0){
              this.service.desfazerDefeitos(this.funcionarioId, osDefeitoIds, this.senha).subscribe((resp) => {
                this.servicosDesfeitos.emit();
                this.osMecanicosComponent.obterServicosParaFuncionarioParalelo()
                this.acoesColetivasComponent.VerificaAberto()
              });
            }
        } 
    });  
  }
}
