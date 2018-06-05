import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DialogAutenticacaoFuncionarioComponent } from '../dialog-autenticacao-funcionario/dialog-autenticacao-funcionario.component';
import { OSFuncionario } from './../models/os-funcionario';

@Component({
	selector: 'app-lista-mecanicos',
	templateUrl: './lista-mecanicos.component.html',
	styleUrls: ['./lista-mecanicos.component.scss']
})
export class ListaMecanicosComponent implements OnInit {
	dialogRef: MdDialogRef<DialogAutenticacaoFuncionarioComponent>;
	osId: number = null;
	listaMecanicoActive: boolean = false;
	@Output() valueChange = new EventEmitter<any>();


	@Input() funcionarios = [];

	swipeAction = { UP: 'swipeup', DOWN: 'swipedown' };

	constructor(private dialog: MdDialog, private router: Router, private activatedRoute: ActivatedRoute) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.osId = params['osId'];
		});
	}

	autenticarFuncionario(item) {
		this.dialogRef = this.dialog.open(DialogAutenticacaoFuncionarioComponent, {
			width: '650px',
			data: new OSFuncionario(this.osId, item.matricula, item.id),
			disableClose:true
		});
	}

	toggleListaMecanicos(): void {
		this.listaMecanicoActive = this.listaMecanicoActive === false ? true : false;
		this.valueChange.emit(this.listaMecanicoActive);
	}

	swipe(action = this.swipeAction.UP) {
		if (action === this.swipeAction.UP) {
			this.listaMecanicoActive = this.listaMecanicoActive === false ? true : false;
			this.valueChange.emit(this.listaMecanicoActive);
		} else if (action === this.swipeAction.DOWN) {
			this.listaMecanicoActive = this.listaMecanicoActive === false ? true : false;
			this.valueChange.emit(this.listaMecanicoActive);
		}
	}
}
