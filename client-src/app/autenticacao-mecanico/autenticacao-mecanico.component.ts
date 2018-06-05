import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routerTransition } from './../router.transition';
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { AutenticacaoMecanico } from './../models/autenticacao-mecanico';
import { AutenticacaoMecanicoService } from './autenticacao-mecanico.service';

import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';

@Component({
  selector: 'app-autenticacao-mecanico',
  templateUrl: './autenticacao-mecanico.component.html',
  styleUrls: ['./autenticacao-mecanico.component.scss'],
  providers: [EmpresaFilialComponent]
})
export class AutenticacaoMecanicoComponent implements OnInit {
  userMecanico: AutenticacaoMecanico;
  dropdownDisabled: boolean = true;
  ativouCapsLock: boolean = false;  
  submitted: boolean = false;
  usuarioSenhaInvalido = false;
  process = false;
  empresas: any;
  matriculaInvalida: boolean = false;
  usuarioApontador: boolean = false;

  constructor(private service: AutenticacaoMecanicoService,
              public notifyService: DialogResultErrorService,
              public empresaFilialComponent: EmpresaFilialComponent) { }

  ngOnInit() {
    this.userMecanico = new AutenticacaoMecanico();

    let empresaAssociacao = JSON.parse(localStorage.getItem('empresaAssociacao'));
    this.userMecanico.empresaAssociacaoId = empresaAssociacao.id;


  }

  login(form: FormGroup) {
    this.usuarioSenhaInvalido = false;
    this.submitted = true;

    if(form.valid){
      this.process = true;
      if(this.userMecanico.funcionarioId > 0){
        this.service.loginMecanico(this.userMecanico)
        .subscribe(res => {
          this.submitted = false;
          this.empresas = [];
          this.process = false;

          this.notifyService.showWarning('Atenção', 'Registro inserido com sucesso');
          
          form.reset();

        });
    }

    this.process = false;    
    }
  }

  onKeyPress(){
    this.usuarioSenhaInvalido = false;
  }

  capsLockEvent(e){
    this.ativouCapsLock = e;
  }

  verificarMultiEmpresa(){
    this.empresaFilialComponent.obterFuncionario(this.userMecanico.empresaAssociacaoId, this.userMecanico.matricula).subscribe((resp) => {
      this.empresas = resp;
      
      if(this.empresas.length > 0){
        this.matriculaInvalida = false;
        this.dropdownDisabled = this.empresas.length == 1 && this.empresas[0].children.length == 1;          
        if (this.dropdownDisabled)
          this.userMecanico.funcionarioId = this.empresas[0].children[0].children[0].value;
      } else {
        this.matriculaInvalida = true; 
        this.dropdownDisabled = true;       
      }
    });
  }

  handleValueUpdated(value){
    this.userMecanico.funcionarioId = value;
  }
}
