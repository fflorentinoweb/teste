import { Component, OnInit } from '@angular/core';
import { routerTransition } from './../router.transition';

@Component({
  selector: 'app-alocacao-os-veiculo',
  templateUrl: './alocacao-os-veiculo.component.html',
  styleUrls: ['./alocacao-os-veiculo.component.scss'],
  host: {
		'[@slideInOutAnimation]': ''
  },
  animations:[routerTransition]
})
export class AlocacaoOsVeiculoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
