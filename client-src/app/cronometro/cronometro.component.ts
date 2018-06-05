import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { ExecucaoDaOsService } from '../execucao-da-os/execucao-da-os.service';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.scss']
})
export class CronometroComponent implements OnInit {
  @Input()
  emExecucao: boolean = false;

  private _tempoExecucao: string;

  @Input()
  set tempoExecucao(tempoExecucao: string) {
	  this._tempoExecucao = (tempoExecucao && tempoExecucao.trim()) || "00:00:00";
	  this.obterCronometro();
  }
 
  get tempoExecucao(): string { return this._tempoExecucao; }

  stop:boolean = true;
  hora:number = 0;	
  minutos:number = 0;
  segundos:number = 0; 
  milesegundos:number = 0;
  vis = null;
  
  horaBase:string;
  minutosBase:string;
  segundosBase:string;
  diasTrabalho:string;

  constructor(
	  private router: Router, 
	  private serviceExecucaoDaOsService: ExecucaoDaOsService,
	  private activatedRoute: ActivatedRoute,
	  public dialogConfirmService: DialogConfirmService) { 
	}

  ngOnInit() {
    
  }
  
  obterCronometro(){
	var horario = this.tempoExecucao.split(':');
	
	if (horario.length == 3){
		this.horaBase = horario[0];
		this.minutosBase = horario[1];
		this.segundosBase = horario[2];

		this.hora = +this.horaBase;
		this.minutos = +this.minutosBase;
		this.segundos = +this.segundosBase;	
	}

	this.visualizar();

	if(this.emExecucao)
		this.iniciarCronometro();
	else this.pararCronometro();
  }

  iniciarCronometro(){
		if(this.stop == true){
			this.stop = false;
			this.cronometro();
		}		
	}

	pararCronometro(){
		this.stop = true;
	}

	visualizar(){
		if(this.hora <= 9) this.vis = "0"; 
		else this.vis = ""; 
		this.vis = this.vis + this.hora + ":";
		if(this.minutos < 10) this.vis = this.vis + "0";
		this.vis = this.vis + this.minutos + ":";
		if(this.segundos < 10) this.vis = this.vis + "0";
		this.vis = this.vis + this.segundos;
	}

	cronometro(){
	 if(this.stop == false){			
		this.milesegundos++;
		if(this.milesegundos > 9) {
		 this.milesegundos = 0;
		 this.segundos++;
		}
		if(this.segundos > 59) {
		 this.segundos = 0;
		 this.minutos++;
		}
		if(this.minutos > 59) {
		 this.minutos = 0;
		 this.hora++;
		}
		this.visualizar();
		setTimeout(() => this.cronometro(), 100);
	 }
	}
}
