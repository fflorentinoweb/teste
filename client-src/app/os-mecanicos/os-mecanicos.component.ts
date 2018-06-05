import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { Location, NgClass } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CronometroComponent } from './../cronometro/cronometro.component';
import { DialogConsultaSolucaoComponent } from './../dialog-consulta-solucao/dialog-consulta-solucao.component'
import { OSServicoFuncionario } from './../models/os-servico-funcionario';
import { IniciarOSServicoFuncionario } from './../models/iniciar-os-servico-funcionario';
import { PausarOSServicoFuncionario } from './../models/pausar-os-servico-funcionario';
import { IniciarOSDefeitoFuncionario } from './../models/iniciar-os-defeito-funcionario';
import { PausarOSDefeitoFuncionario } from './../models/pausar-os-defeito-funcionario';
import { FinalizarOsSugestao } from './../models/finalizar-os-sugestao';
import { OsMecanicosService } from './os-mecanicos.service';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { DialogSolucaoComponent } from "../dialog-solucao/dialog-solucao.component";
import { DialogSolucaoCarrosselComponent } from "../dialog-solucao-carrossel/dialog-solucao-carrossel.component";
import { AcoesColetivasComponent } from './../acoes-coletivas/acoes-coletivas.component';
import { DialogComplementoDefeitoComponent } from './../dialog-complemento-defeito/dialog-complemento-defeito.component';
import { WindowRef } from './windowRef.service';

import { DxPopoverModule, DxTemplateModule } from 'devextreme-angular';
import { routerTransition } from './../router.transition';

@Component({
  selector: 'app-os-mecanicos',
  templateUrl: './os-mecanicos.component.html',
  styleUrls: ['./os-mecanicos.component.scss'],
  providers: [AcoesColetivasComponent]
})

export class OsMecanicosComponent implements OnInit {

  servicos: OSServicoFuncionario[] = [];
  servicosParalelo: OSServicoFuncionario[] = [];
  osId: number;
  funcionarioId: number;
  senha: string;
  nomeFuncionario: string;
  servicosSelecionados: any[] = [];
  empresaAssociacaoId: number;
  hideAcoes: boolean = false
  hideBotes: boolean = false
  botaoRegovar: boolean = false
  showTooltip: boolean = false;
  withAnimationOptionsVisible: any[] = [];
  mylistPopoverVisible: any[] = [];
  cardsParaLista: boolean = false
  windowSize: number;
  alteraIconeModeDeVisualizacao: any
  servicosrevogado = []

  scrollimateOptions: any = {
    myScrollimation: {
      currentState: "inactive",
      states: [{
          method: "percentTotal",
          value: 85,
          state: "active",
          class: "animated"
        },
        {
          method: "default",
          state: "inactive",
          setAtLastChance: false
        }
      ]
    }
  }

  constructor(
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: OsMecanicosService,
    private dialogConfirmService: DialogConfirmService,
    private notifyService: DialogResultErrorService,
    private dialog: MdDialog,
    public acoesColetivasComponent: AcoesColetivasComponent,
    private winRef: WindowRef) {

  }


  ngOnInit() {
    let empresaAssociacao = JSON.parse(localStorage.getItem('empresaAssociacao'));
    let botaoRevogar = JSON.parse(localStorage.getItem('botaoRevogar'));

    this.empresaAssociacaoId = empresaAssociacao.id;
    this.botaoRegovar = botaoRevogar.botaoRevogar;

    this.activatedRoute.params.subscribe((params: Params) => {
      this.osId = params['osId'];
      this.funcionarioId = params['funcionarioId'];
    });

    let funcionario = JSON.parse(localStorage.getItem('funcionario'));
    this.nomeFuncionario = funcionario.nome;
    this.senha = funcionario.senha;

    let modeDeExibicao = JSON.parse(localStorage.getItem('modeExibicaoOS'));
    if (!modeDeExibicao) {
      localStorage.setItem('modeExibicaoOS', JSON.stringify({
        mode: 'cards'
      }));
    }
    this.obterServicosParaFuncionario();
    this.obterServicosParaFuncionarioParalelo();
    this.ObterModeDeVisualizacao();

    this.windowSize = this.winRef.nativeWindow.innerWidth;

    if (this.windowSize < 991) {
      this.cardsParaLista = false
    }
  }

  obterServicosParaFuncionario() {
    this.service.obterServicosParaFuncionario(this.osId, this.funcionarioId, this.senha).subscribe((resp) => {
      this.servicos = resp.data;
      for (var i = 0; i < this.servicos.length; i++) {
        this.servicos[i].processPlayPause = false;
        this.mylistPopoverVisible[i] = false;
      }

      this.hideProcessAll();
    });
  }

  obterServicosParaFuncionarioParalelo() {
    this.service.obterServicosParaFuncionario(this.osId, this.funcionarioId, this.senha).subscribe((resp) => {
      this.servicosParalelo = resp.data;
    });
  }

  servicosFinalizados() {
    this.service.osServicosFinalizados(this.osId).subscribe((resp) => {
      let osProntaParaFinalizar = resp.data;
      if (osProntaParaFinalizar == 3)
        this.confirmarFinalizacaoDaOS();
    });
  }

  backClicked() {
    this._location.back();
  }

  displayStatus(servico: OSServicoFuncionario) {
    if (servico.status == 1)
      return "Finalizado";

    if (!servico.emExecucao && !servico.tempoExecucao)
      return "Aberto";

    if (servico.emExecucao)
      return "Execução";

    return "Pausado";
  }

  limparSelecao() {
    this.servicosSelecionados.forEach(x => x.stateCheck = false);
    this.servicosSelecionados = [];
  }

  atualizarSelecao(servico, event) {
    if (event.checked) {
      this.servicosSelecionados.push(servico);
    } else {
      let index = this.servicosSelecionados.indexOf(servico);
      this.servicosSelecionados.splice(index, 1);
    }
  }

  iniciarTodosSelecionados() {
    let osServicoIds = this.servicosSelecionados.filter(
      x => x.servico != null && x.status == 0 && !x.emExecucao).map(x => x.osServicoId);

    let osDefeitoIds = this.servicosSelecionados.filter(
      x => x.defeito != null && x.status == 0 && !x.emExecucao).map(x => x.osDefeitoId);

    if (osServicoIds.length == 0 && osDefeitoIds.length == 0) {
      this.notifyService.showWarning('Atenção', "Por favor, selecione ao menos um serviço ou defeito com status 'Aberto' ou 'Pausado'");
      return;
    }

    this.showProcessAll(osServicoIds, osDefeitoIds);

    if (osServicoIds.length > 0) {
      let body = new IniciarOSServicoFuncionario(this.funcionarioId, this.osId, this.empresaAssociacaoId, osServicoIds, this.senha);
      this.service.iniciarServicos(body).subscribe((resp) => {
        this.obterServicosParaFuncionario();
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
        this.limparSelecao();
      });
    }

    if (osDefeitoIds.length > 0) {
      let body = new IniciarOSDefeitoFuncionario(this.funcionarioId, this.osId, this.empresaAssociacaoId, osDefeitoIds, this.senha);
      this.service.iniciarDefeitos(body).subscribe((resp) => {
        this.obterServicosParaFuncionario();
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
        this.limparSelecao()
      });
    }
  }

  pausarTodosSelecionados() {
    let osServicoIds = this.servicosSelecionados.filter(
      x => x.servico != null && x.status == 0 && x.emExecucao).map(x => x.osServicoId);

    let osDefeitoIds = this.servicosSelecionados.filter(
      x => x.defeito != null && x.status == 0 && x.emExecucao).map(x => x.osDefeitoId);

    if (osServicoIds.length == 0 && osDefeitoIds.length == 0) {
      this.notifyService.showWarning('Atenção', "Por favor, selecione ao menos um serviço ou defeito com status 'Em execução'");
      return;
    }

    this.showProcessAll(osServicoIds, osDefeitoIds);

    if (osServicoIds.length > 0) {
      let body = new PausarOSServicoFuncionario(this.funcionarioId, osServicoIds, this.senha);
      this.service.pausarServicos(body).subscribe((resp) => {
        this.obterServicosParaFuncionario();
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
        this.limparSelecao();
      });
    }

    if (osDefeitoIds.length > 0) {
      let body = new PausarOSDefeitoFuncionario(this.funcionarioId, osDefeitoIds, this.senha);
      this.service.pausarDefeitos(body).subscribe((resp) => {
        this.obterServicosParaFuncionario();
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
        this.limparSelecao();
      });
    }
  }

  finalizarTodosSelecionados() {
    let osServicos = this.servicosSelecionados.filter(
      x => x.servico != null && x.status == 0 && x.tempoExecucao != null);

    let osDefeitos = this.servicosSelecionados.filter(
      x => x.defeito != null && x.status == 0 && x.tempoExecucao != null);

    if (osServicos.length == 0 && osDefeitos.length == 0) {
      this.notifyService.showWarning('Atenção', "Por favor, selecione ao menos um serviço ou defeito com status 'Em execução' ou 'Pausado'");
      return;
    }

    let servicosAFinalizar = osDefeitos.concat(osServicos);

    let dialogSolucaoCarrossel = this.dialog.open(DialogSolucaoCarrosselComponent, {
      data: {
        osId: Number(this.osId),
        servicosAFinalizar: servicosAFinalizar
      },
      panelClass: 'dialog-panel-carrossel',
      disableClose: true
    });

    dialogSolucaoCarrossel.afterClosed().subscribe((resp) => {
      if (resp) {
        this.obterServicosParaFuncionario();
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
        this.limparSelecao();
        this.service.osServicosFinalizados(this.osId).subscribe((resp) => {
          let osProntaParaFinalizar = resp.data;
          if (osProntaParaFinalizar == 3) {
            this.confirmarFinalizacaoDaOS()
          }
        });
      }
    });
  }

  desfazerTodosSelecionados() {
    let osServicoIds = this.servicosSelecionados.filter(
      x => x.servico != null && x.status == 0 && x.tempoExecucao != null).map(x => x.osServicoId);

    let osDefeitoIds = this.servicosSelecionados.filter(
      x => x.defeito != null && x.status == 0 && x.tempoExecucao != null).map(x => x.osDefeitoId);

    if (osServicoIds.length == 0 && osDefeitoIds.length == 0) {
      this.notifyService.showWarning('Atenção', "Por favor, selecione ao menos um serviço ou defeito com status 'Em execução' ou 'Pausado'");
      return;
    }

    this.dialogConfirmService
      .confirm('Atenção', 'Deseja realmente desfazer a execução?')
      .subscribe(res => {
        if (res) {
          this.showProcessAllDesfazer(osServicoIds, osDefeitoIds);

          if (osServicoIds.length > 0) {
            this.service.desfazerServicos(this.funcionarioId, osServicoIds, this.senha).subscribe((resp) => {
              this.obterServicosParaFuncionario();
              this.obterServicosParaFuncionarioParalelo();
              this.acoesColetivasComponent.VerificaAberto()
              this.limparSelecao();
            });
          }
          if (osDefeitoIds.length > 0) {
            this.service.desfazerDefeitos(this.funcionarioId, osDefeitoIds, this.senha).subscribe((resp) => {
              this.obterServicosParaFuncionario();
              this.obterServicosParaFuncionarioParalelo();
              this.acoesColetivasComponent.VerificaAberto()
              this.limparSelecao();
            });
          }
        }
      });
  }

  iniciar(servico: OSServicoFuncionario, cronometro: CronometroComponent) {
    servico.processPlayPause = true;
    if (servico.servico) {
      let body = new IniciarOSServicoFuncionario(this.funcionarioId, this.osId, this.empresaAssociacaoId, [servico.osServicoId], this.senha);
      this.service.iniciarServicos(body).subscribe((resp) => {
        this.iniciarCronometro(servico, cronometro);
        servico.processPlayPause = false;
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
      });
    } else {
      let body = new IniciarOSDefeitoFuncionario(this.funcionarioId, this.osId, this.empresaAssociacaoId, [servico.osDefeitoId], this.senha);
      this.service.iniciarDefeitos(body).subscribe((resp) => {
        this.iniciarCronometro(servico, cronometro);
        servico.processPlayPause = false;
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
      });
    }
  }

  pausar(servico: OSServicoFuncionario, cronometro: CronometroComponent) {
    servico.processPlayPause = true;

    if (servico.servico) {
      let body = new PausarOSServicoFuncionario(this.funcionarioId, [servico.osServicoId], this.senha);
      this.service.pausarServicos(body).subscribe((resp) => {
        this.pararCronometro(servico, cronometro);
        servico.processPlayPause = false;
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
      });
    } else {
      let body = new PausarOSDefeitoFuncionario(this.funcionarioId, [servico.osDefeitoId], this.senha);
      this.service.pausarDefeitos(body).subscribe((resp) => {
        this.pararCronometro(servico, cronometro);
        servico.processPlayPause = false;
        this.obterServicosParaFuncionarioParalelo();
        this.acoesColetivasComponent.VerificaAberto()
      });
    }
  }

  revogar(servico: OSServicoFuncionario, cronometro: CronometroComponent, i: number) {
    servico.processPlayPause = true;
    if (servico.servico) {
      this.dialogConfirmService
        .confirm('Atenção', 'Tem certeza que deseja reabrir o serviço?')
        .subscribe(res => {
          if (res) {
            let body = new PausarOSServicoFuncionario(this.funcionarioId, [servico.osServicoId], this.senha);
            this.service.revogarServicos(body).subscribe((resp) => {
              this.pararCronometro(servico, cronometro);
              servico.processPlayPause = false;
              if(resp){
              servico.status = 0;
              this.obterServicosParaFuncionarioParalelo();
              this.acoesColetivasComponent.VerificaAberto()
              this.servicosrevogado[i] = true;
              }
            });
          }
        });
    } else {
      this.dialogConfirmService
        .confirm('Atenção', 'Tem certeza que deseja reabrir o defeito?')
        .subscribe(res => {
          if (res) {
            let body = new PausarOSDefeitoFuncionario(this.funcionarioId, [servico.osDefeitoId], this.senha);
            this.service.revogarDefeitos(body).subscribe((resp) => {
              this.pararCronometro(servico, cronometro);
              servico.processPlayPause = false;
             if(resp){
              servico.status = 0;
              this.obterServicosParaFuncionarioParalelo();
              this.acoesColetivasComponent.VerificaAberto()
              this.servicosrevogado[i] = true;
              }
            });
          }
        });

    }
  }

  finalizar(servico: OSServicoFuncionario, cronometro: CronometroComponent) {
    servico.osId = Number(this.osId);
    let dialogSolucao = this.dialog.open(DialogSolucaoComponent, {
      width: '460px',
      data: servico,
      disableClose: true
    });

    dialogSolucao.afterClosed().subscribe((resp) => {
      if (resp) {
        this.pararCronometro(servico, cronometro);
        servico.status = 1;
        this.service.osServicosFinalizados(this.osId).subscribe((resp) => {
          let osProntaParaFinalizar = resp.data;
          if (osProntaParaFinalizar == 3) {
            this.confirmarFinalizacaoDaOS()
          }
          this.obterServicosParaFuncionarioParalelo();
          this.acoesColetivasComponent.VerificaAberto()
        });
      }
    });
  }


  confirmarFinalizacaoDaOS() {
    this.dialogConfirmService
      .confirm('Atenção', 'Todos os serviços disponíveis já foram executados. Deseja finalizar a OS?')
      .subscribe(res => {
        if (res) {
          let body = new FinalizarOsSugestao(this.funcionarioId, this.senha);
          this.service.finalizarOS(this.osId, body).subscribe((resp) => {
            this.router.navigate(['./ExecucaoDaOs/' + this.osId]);
          });
        }
      });
  }

  desfazer(servico: OSServicoFuncionario) {
    this.dialogConfirmService
      .confirm('Atenção', 'Deseja realmente desfazer a execução?')
      .subscribe(res => {
        if (res) {
          servico.process = true;

          if (servico.servico) {
            this.service.desfazerServicos(this.funcionarioId, [servico.osServicoId], this.senha).subscribe(resp => {
              this.zerarCronometro(servico);
              servico.process = false;
              this.obterServicosParaFuncionarioParalelo();
              this.acoesColetivasComponent.VerificaAberto()
            });
          } else {
            this.service.desfazerDefeitos(this.funcionarioId, [servico.osDefeitoId], this.senha).subscribe(resp => {
              this.zerarCronometro(servico);
              servico.process = false
              this.obterServicosParaFuncionarioParalelo();
              this.acoesColetivasComponent.VerificaAberto()
            });
          }
        }
      });
  }

  zerarCronometro(servico: OSServicoFuncionario) {
    servico.emExecucao = false;
    servico.tempoExecucao = null;
  }

  iniciarCronometro(servico: OSServicoFuncionario, cronometro: CronometroComponent) {
    setTimeout(() => {
      servico.emExecucao = true;
      //TODO: Refatorar código abaixo: Ao iniciar a execução, tempoExecucao precisa ser diferente de nulo para atualização dos botões
      // e demais controles visuais que dependem dessa informação
      if (servico.tempoExecucao == null)
        servico.tempoExecucao = "0";

      cronometro.iniciarCronometro();
    }, 500);
  }

  pararCronometro(servico: OSServicoFuncionario, cronometro: CronometroComponent) {
    setTimeout(() => {
      servico.emExecucao = false;
      cronometro.pararCronometro();
    }, 500);
  }

  consultarSolucao(servico: OSServicoFuncionario) {
    this.dialog.open(DialogConsultaSolucaoComponent, {
      width: '460px',
      data: servico
    });
  }

  getObjectServicos(servico, desfazer: boolean) {
    let servicoID = this.servicos.filter(s => {
      if (s.osServicoId == servico) {
        if (desfazer) {
          s.process = true;
        } else {
          s.processPlayPause = true;
        }
      }
    });
  }

  getObjectDefeitos(defeito, desfazer: boolean) {
    let defeitoID = this.servicos.filter(d => {
      if (d.osDefeitoId == defeito) {
        if (desfazer) {
          d.process = true;
        } else {
          d.processPlayPause = true;
        }
      }
    });
  }

  showProcessAll(osServicoIds, osDefeitoIds) {
    // For Serviços
    if (osServicoIds.length > 0) {
      for (var i = 0; i < osServicoIds.length; i++) {
        this.getObjectServicos(osServicoIds[i], null);
      }
    }

    // For osDefeitoIds
    if (osDefeitoIds.length > 0) {
      for (var i = 0; i < osDefeitoIds.length; i++) {
        this.getObjectDefeitos(osDefeitoIds[i], null);
      }
    }
  }

  showProcessAllDesfazer(osServicoIds, osDefeitoIds) {
    // For Serviços
    if (osServicoIds.length > 0) {
      for (var i = 0; i < osServicoIds.length; i++) {
        this.getObjectServicos(osServicoIds[i], true);
      }
    }

    // For osDefeitoIds
    if (osDefeitoIds.length > 0) {
      for (var i = 0; i < osDefeitoIds.length; i++) {
        this.getObjectDefeitos(osDefeitoIds[i], true);
      }
    }
  }

  hideProcessAll() {
    for (var i = 0; i < this.servicos.length; i++) {
      this.servicos[i].processPlayPause = false;
      this.servicos[i].process = false;
    }
  }

  public handleValue(value) {
    this.hideAcoes = value
  }

  public handleBotoes(value) {
    this.hideBotes = value
  }

  public VerMaisComplemento(item) {
    this.dialog.open(DialogComplementoDefeitoComponent, {
      width: '460px',
      data: item
    });
  }

  public ObterModeDeVisualizacao() {
    let modeDeExibicao = JSON.parse(localStorage.getItem('modeExibicaoOS'));
    if (modeDeExibicao.mode) {
      if (modeDeExibicao.mode == 'cards') {
        this.cardsParaLista = false
      } else if (modeDeExibicao.mode == 'list') {
        this.cardsParaLista = true
      } else if (!modeDeExibicao.mode) {
        this.cardsParaLista = false
      }
    }
  }

  public AlternarVisualizacao() {
    this.cardsParaLista = !this.cardsParaLista
    if (this.cardsParaLista) {
      localStorage.setItem('modeExibicaoOS', JSON.stringify({
        mode: 'list'
      }));
      this.alteraIconeModeDeVisualizacao = 'card'
    } else {
      localStorage.setItem('modeExibicaoOS', JSON.stringify({
        mode: 'cards'
      }));
      this.alteraIconeModeDeVisualizacao = 'list'
    }
  }



  onMouseenterPopover(e, index) {
    this.mylistPopoverVisible[index] = true;
  }

  onMouseleavePopover(e, index) {
    for (var i = 0; i < this.mylistPopoverVisible.length; i++) {
      this.mylistPopoverVisible[i] = false;
    }

  }

  onMouseenterPopover2(e, index) {
    this.mylistPopoverVisible[index] = true;
  }

  onMouseleavePopover2(e, index) {
    for (var i = 0; i < this.mylistPopoverVisible.length; i++) {
      this.mylistPopoverVisible[i] = false;
    }

  }

}
