import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';
import { DialogMenuGestorComponent } from '../dialog-menu-gestor/dialog-menu-gestor.component';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-selecao-garagem-registro-presenca',
  templateUrl: './selecao-garagem-registro-presenca.component.html',
  styleUrls: ['./selecao-garagem-registro-presenca.component.scss'],
  providers: [EmpresaFilialComponent,DialogMenuGestorComponent]
  
})
export class SelecaoGaragemRegistroPresencaComponent implements OnInit {
  empresas: any;
  
  constructor(private router: Router,
    public empresaFilialComponent: EmpresaFilialComponent,
    public dialogMenuGestorComponent: DialogMenuGestorComponent,
    public appComponent: AppComponent) { }

  ngOnInit() {
    this.getGaragens()
  }

  getGaragens(){
    this.empresaFilialComponent.obterGaragem().subscribe((resp) => {
      this.empresas = resp;
    });
  }

  handleValueUpdated(value){
    if(value){
      localStorage.setItem('empresaAssociacao', JSON.stringify({ id: value }));

      this.router.navigate(['./AutenticacaoMecanico/' + value]);
    }
  }

}
