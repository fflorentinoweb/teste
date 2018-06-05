import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { DialogAutenticacaoFuncionarioComponent } from '../dialog-autenticacao-funcionario/dialog-autenticacao-funcionario.component';
import { ExecucaoDaOsComponent } from '../execucao-da-os/execucao-da-os.component';
import { ExecucaoDaOsService } from '../execucao-da-os/execucao-da-os.service';
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";

import { PausarOuFinalizar } from "../enum/pausar-ou-finalizar.enum";
import { PausarOuFinalizarOs } from './../models/pausar-ou-finalizar-os';

@Component({
  selector: 'app-pausar-os',
  templateUrl: './pausar-os.component.html',
  styleUrls: ['./pausar-os.component.scss']
})
export class PausarOsComponent implements OnInit {
  dialogRef: MdDialogRef<DialogAutenticacaoFuncionarioComponent>;
  osId:number = null;

  @Input()
  tempoExecucao: string;

  @Input()
  emExecucao: boolean = false;

  @Output()
  pausaEfetuada = new EventEmitter();

  constructor(private dialog: MdDialog,
              private dialogConfirmService: DialogConfirmService,
              private router: Router,
              private serviceExecucaoDaOsService: ExecucaoDaOsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.osId = params['osId'];
		});
  }

  pausar(){
		this.dialogConfirmService
				.confirm('Atenção', 'Deseja realmente pausar a OS?')
				.subscribe(res => {
					if (res) {
						this.autenticarFuncionario();
					}
				});
	}

  autenticarFuncionario() {
    this.dialogRef = this.dialog.open(DialogAutenticacaoFuncionarioComponent, {
			width: '650px',
      data: new PausarOuFinalizarOs(this.osId, PausarOuFinalizar.Pausar),
      disableClose:true
		});

    this.dialogRef.afterClosed().subscribe((resp) => {
      if (resp)
        this.pausaEfetuada.emit()
    });
  }
}
