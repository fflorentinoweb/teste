import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';
import { DialogMenuGestorComponent } from '../dialog-menu-gestor/dialog-menu-gestor.component';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-empresa-filial-garagem-execucao-da-os',
  templateUrl: './empresa-filial-garagem-execucao-da-os.component.html',
  styleUrls: ['./empresa-filial-garagem-execucao-da-os.component.scss'],
  providers: [EmpresaFilialComponent,DialogMenuGestorComponent]
  
})
export class EmpresaFilialGaragemExecucaoDaOsComponent implements OnInit {
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
      this.router.navigate(['./AlocacaoOsVeiculo/' + value]);
    }
  }

}
