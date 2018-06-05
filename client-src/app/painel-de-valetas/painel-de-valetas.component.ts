import { Component, OnInit, ElementRef, Input, Output, ViewChild, ViewChildren } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, AnimationBuilder } from '@angular/animations';
import { Location, NgClass } from '@angular/common';
import { PainelDeValetasService } from './painel-de-valetas.service';
import { routerTransition } from './../router.transition';
import { MdDialog, MdDialogRef } from '@angular/material';
import { breakpointsProvider, BreakpointsService, BreakpointEvent } from 'angular-breakpoints';

import { DialogConfiguracoesVelatasComponent } from './../dialog-configuracoes-velatas/dialog-configuracoes-velatas.component';
import { DialogConfiguracoesValetasService } from './../dialog-configuracoes-velatas/dialog-configuracoes-valetas.service';
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";

import { ConfiguracoesValetaConteudo } from './../models/configuracoes-valeta-conteudo';

import { StatusPainelValeta } from './../enum/status-painel-valeta.enum';
@Component({
  selector: 'app-painel-de-valetas',
  templateUrl: './painel-de-valetas.component.html',
  styleUrls: ['./painel-de-valetas.component.scss'],
  host: {
    '[@slideInOutAnimation]': ''
  },
  animations: [
    routerTransition,
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({
          opacity: 0
        }), {
          optional: true
        }),
        query(':enter', stagger('20ms', [
          animate('0.5s ease-in', keyframes([
            style({
              opacity: 0,
              transform: 'translateY(35px)',
              offset: 0.3
            }),
            style({
              opacity: 1,
              transform: 'translateY(0)',
              offset: 1.0
            }),
          ]))
        ]), {
          optional: true
        }),
        query(':leave', stagger('10ms', [
          animate('0.3s ease-in', keyframes([
            style({
              opacity: 1,
              transform: 'translateY(0)',
              offset: 0.3
            }),
            style({
              opacity: 0,
              transform: 'translateY(35px)',
              offset: 1.0
            }),
          ]))
        ]), {
          optional: true
        })
      ])
    ])
  ]
})
export class PainelDeValetasComponent implements OnInit {
  dialogConfiguracoesValetas: MdDialogRef < DialogConfiguracoesVelatasComponent > ;
  configuracoesValetaConteudo: ConfiguracoesValetaConteudo;

  @Input() selectedIndex;
  @ViewChild('movevaletafisica') moveValetaFisicaEl: ElementRef;
  @ViewChild('movevaletavirtual') moveValetaVirtualEl: ElementRef;

  valetas: any = [];
  valetasFisicas: any = [];
  valetasVirtuais: any = [];
  loop: any;
  timer: number = 10000;
  animationPlayer: any;
  showValetasFisicas: boolean = true;
  showValetasVirtuais: boolean = false;
  requestComplete: boolean = false;

  heightBreakponint: number;
  myBreakpoints: any;
  disableClose: boolean = false;
  statusPainelValeta: StatusPainelValeta;
  optionsStatusPainelValeta: string[];

  constructor(
    private dialog: MdDialog,
    private service: PainelDeValetasService,
    private elRef: ElementRef,
    private animBuilder: AnimationBuilder,
    private breakpointsService: BreakpointsService,
    private dialogConfiguracoesValetasService: DialogConfiguracoesValetasService,
    public notifyService: DialogResultErrorService,
  ) {
    this.breakpointsService.changes.subscribe((event: BreakpointEvent) => {
      this.myBreakpoints = event;

      if (event.size.height >= 950) {
        this.heightBreakponint = 285;
      } else if (event.size.height >= 810) {
        this.heightBreakponint = 235;
      } else if (event.size.height < 810) {
        this.heightBreakponint = 185;
      }
    });
  }

  ngOnInit() {
    this.selectedIndex = 0;

    this.checkConfig();
  }

  public onDoneAnimation(e) {
    if (e.toState > 0) {
      this.getRows();
    }
  }

  public checkConfig() {
    this.dialogConfiguracoesValetasService.obterParametros().subscribe((resp) => {
      if (resp.data) {
        this.disableClose = false;
        this.configuracoesValetaConteudo = resp.data;

        this.getTimer();
        this.obterPainel();
      } else {
        this.disableClose = true;
        this.configuracoes();
      }
    });
  }

  public getTimer() {
    if (this.configuracoesValetaConteudo.trocarPainelId == 0) {
      this.timer = 10000;
    } else if (this.configuracoesValetaConteudo.trocarPainelId == 1) {
      this.timer = 20000;
    } else if (this.configuracoesValetaConteudo.trocarPainelId == 2) {
      this.timer = 30000;
    } else if (this.configuracoesValetaConteudo.trocarPainelId == 3) {
      this.timer = 100000;
    }
  }

  public obterPainel() {
    this.valetas = [];
    this.valetasFisicas = [];
    this.valetasVirtuais = [];

    this.requestComplete = false;

    this.service.obterPainel(this.configuracoesValetaConteudo).subscribe((resp) => {
      this.valetas = resp.data;
      if (this.valetas.length === 0) {
        this.notifyService.showWarning('Atenção', 'Não existem valetas cadastradas');
      }
      for (var i = 0; i < this.valetas.length; i++) {
        if (this.valetas[i].tipo == 0) {
          this.valetasFisicas.push(this.valetas[i]);
        } else {
          this.valetasVirtuais.push(this.valetas[i]);
        }
      }

      this.verificarVeltas();

      this.requestComplete = true;
    });
  }

  public verificarVeltas() {
    if (this.valetas.length === 0) {
      return
    } else if (this.valetasFisicas.length == 0 && this.selectedIndex == 0) {
      this.selectedIndex = 1;
      return;
    } else if (this.valetasVirtuais.length == 0 && this.selectedIndex == 1) {
      this.selectedIndex = 0;
      return;
    }

  }

  public configuracoes() {
    let dialogConfig = this.dialog.open(DialogConfiguracoesVelatasComponent, {
      width: '460px',
      disableClose:true
    });

    dialogConfig.afterClosed().subscribe((resp) => {
      if (this.selectedIndex === 0) {
        this.selectedIndex = 1
        return
    }else if (this.selectedIndex === 1){
      this.selectedIndex = 0
      return
    }else if (this.selectedIndex === 0 && this.valetasVirtuais.legnth === 0) {
        this.selectedIndex = 0
        return
    }else if (this.selectedIndex === 1 && this.valetasFisicas.length === 0){
      this.selectedIndex = 1
      return
    }
    // else if(this.selectedIndex === 0 && this.valetasVirtuais.length > 0){
    //   this.selectedIndex = 1
    //   return
    // }else if(this.selectedIndex === 1 && this.valetasFisicas.length > 0){
    //   this.selectedIndex = 0
    //   return
    // }

    });
  }

  public getRows() {
    var numberPerRow = [];
    var offsets = [];
    var valetaGrid;

    if (this.selectedIndex === 0) {
      valetaGrid = this.moveValetaFisicaEl.nativeElement;
    } else {
      valetaGrid = this.moveValetaVirtualEl.nativeElement;
    }

    valetaGrid.querySelectorAll('.item-grid').forEach(item => {
      var thisOffset = item.offsetTop;
      var index = offsets.indexOf(thisOffset);

      if (index >= 0) {
        numberPerRow[index]++;
      } else {
        offsets.push(thisOffset);
        numberPerRow.push(1);
      }
    });

    var maxColumns = Math.max.apply(null, numberPerRow);
    var maxRows = numberPerRow.length;

    this.transitionValeta(maxColumns, maxRows);
  }

  public transitionValeta(maxColumns, maxRows) {
    var current = 0;
    var height = this.heightBreakponint;
    var currentLength = maxRows - 2;
    var moveValeta;

    if (this.myBreakpoints.size.width > 767) {
      this.loop = setInterval(() => {
        current++;

        if (current >= currentLength) {
          current = 0;

          if (this.selectedIndex === 0) {
            this.selectedIndex = 1;
            return;
          } else {
            this.selectedIndex = 0;
            return;
          }
        }

        var transitionMove = height * current;

        if (this.selectedIndex === 0) {
          moveValeta = this.moveValetaFisicaEl.nativeElement;
        } else {
          moveValeta = this.moveValetaVirtualEl.nativeElement;
        }

        this.slideMoveValeta(transitionMove, moveValeta);

      }, this.timer);
    }
  }

  public slideMoveValeta(transitionMove, moveValeta): void {
    const moveBallAnimation = this.animBuilder.build([
      animate('1s ease', style({
        'margin-top': `-${transitionMove}px`
      }))
    ]);

    this.animationPlayer = moveBallAnimation.create(moveValeta);
    this.animationPlayer.play();
  }

  public removeItems(valeta) {
    valeta.splice(0, valeta.length);
  }

  public onTabClick(index) {
    switch (index) {
      case 0:
        this.removeItems(this.valetasFisicas);
        this.showValetasFisicas = true;
        this.showValetasVirtuais = false;
        this.selectedIndex = 0;
        break;
      case 1:
        this.removeItems(this.valetasVirtuais);
        this.showValetasFisicas = false;
        this.showValetasVirtuais = true;
        this.selectedIndex = 1;
        break;
    }

    clearInterval(this.loop);

    this.checkConfig();
  }

  public displayStatus(valeta, veiculo) {
    var x = StatusPainelValeta;
    var options = Object.keys(StatusPainelValeta);
    this.optionsStatusPainelValeta = options.slice(options.length / 2);

    return this.optionsStatusPainelValeta[veiculo.status];
  }
}
