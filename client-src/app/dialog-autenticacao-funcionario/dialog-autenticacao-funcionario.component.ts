import { Component, OnInit, Inject, ViewChild, ElementRef, Renderer, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

import { DialogAutenticacaoFuncionarioService } from './dialog-autenticacao-funcionario.service'
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { ExecucaoDaOsService } from "../execucao-da-os/execucao-da-os.service";

import { AutenticacaoFuncionario } from "../models/autenticacao-funcionario";
import { ParametrosOs } from "../models/parametros-os";
import { PausarOuFinalizarOs } from './../models/pausar-ou-finalizar-os';
import { OSFuncionario } from './../models/os-funcionario';
import { FinalizarOsPendencia } from "../models/finalizar-os-pendencia";
import { Pendencia } from "../models/pendencia";

import { PausarOuFinalizar } from "../enum/pausar-ou-finalizar.enum";
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";

import { Globals } from './../globals';

import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';
import { PlanoSobreVida } from '../models/plano-sobre-vida';


@Component({
  selector: 'app-dialog-autenticacao-funcionario',
  templateUrl: './dialog-autenticacao-funcionario.component.html',
  styleUrls: ['./dialog-autenticacao-funcionario.component.scss'],
  providers: [EmpresaFilialComponent]
})

export class DialogAutenticacaoFuncionarioComponent {
  @ViewChild("myInputMatricula") matricula: ElementRef;
  @ViewChild("myInputSenha") senha: ElementRef;

  autenticacaoFuncionario: AutenticacaoFuncionario;
  dropdownDisabled: boolean = true;
  submitted: boolean = false;
  ativouCapsLock: boolean = false;
  osId: number = null;
  acao: PausarOuFinalizar;
  habilitarMatricula: boolean = true;
  authValido: boolean = false;
  matriculaInvalida: boolean = false;
  process = false;
  empresaAssociacaoId: number;
  empresas: any;
  isDisabledFuncionario: boolean = true;
  isVisibleFuncionario: boolean = true;
  funcionarioId: any;
  verificaChangeForm: boolean = false;
  usuarioApontador: boolean = false;


  constructor(
    private dialogRef: MdDialogRef < DialogAutenticacaoFuncionarioComponent > ,
    private dialog: MdDialog,
    private notifyService: DialogResultErrorService,
    private router: Router,
    private dialogConfirmService: DialogConfirmService,
    private serviceAutenticacaoFuncionarioService: DialogAutenticacaoFuncionarioService,
    private serviceExecucaoDaOsService: ExecucaoDaOsService,
    private renderer: Renderer,
    public empresaFilialComponent: EmpresaFilialComponent,
    private globals: Globals,
    @Inject(DOCUMENT) doc: any,
    @Inject(MD_DIALOG_DATA) private data: any) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('dialog-open')) {
        doc.body.classList.add('dialog-open');
      }
    });
    dialog.afterAllClosed.subscribe(() => {
      doc.body.classList.remove('dialog-open');
    });
    this.ObterParametroApontador()
  }

    ngOnInit() {
      let empresaAssociacao = JSON.parse(localStorage.getItem('empresaAssociacao'));
      this.empresaAssociacaoId = empresaAssociacao.id;


      if (this.data instanceof PausarOuFinalizarOs){
        this.osId = this.data.osId;
        this.acao = this.data.acao;
        this.autenticacaoFuncionario = new AutenticacaoFuncionario();
      }
      else if(this.data instanceof OSFuncionario){
        this.autenticacaoFuncionario = new AutenticacaoFuncionario(this.data.usuarioId, this.data.matricula);
        this.osId = this.data.osId;
        this.habilitarMatricula = this.data.matricula == null;

      if (this.data.usuarioId) {
        this.isVisibleFuncionario = false;
      }
    } else if (this.data instanceof FinalizarOsPendencia) {
      this.osId = this.data.osId
      this.autenticacaoFuncionario = new AutenticacaoFuncionario();
    }

  }

  ngAfterViewInit() {
    setTimeout(() => {
      if(this.usuarioApontador){
        if (!this.data.matricula) {
          this.matricula.nativeElement.focus()
        } else {
          this.senha.nativeElement.focus();
        }
      }
    }, 500);
  }

  alocarFuncionarioParaOS(form: FormGroup) {
    this.submitted = true;
    if (form.valid && this.autenticacaoFuncionario.usuarioId) {
      this.authValido = false;
      this.process = true;
      this.serviceAutenticacaoFuncionarioService.autenticarFuncionario(this.empresaAssociacaoId, this.autenticacaoFuncionario).subscribe((resp) => {
        if (resp.data == null) {
          this.process = false;
          this.authValido = true;
        } else {
          this.process = false;
          let funcionario = resp.data;
          localStorage.setItem('funcionario', JSON.stringify({
            nome: funcionario.nome,
            senha: funcionario.senha
          }));
          this.dialogRef.close();
          this.router.navigate(['./OsMecanicos/' + this.osId + "/" + funcionario.id]);
        }
      });
    }
  }

  onKeyPress() {
    this.authValido = false;
  }

  capsLockEvent(e) {
    this.ativouCapsLock = e;
  }

  pausarOuFinalizarOS(form: FormGroup) {
    this.submitted = true;

    if (form.valid && this.autenticacaoFuncionario.usuarioId) {
      let parametroOS = new ParametrosOs();
      parametroOS.Acao = this.data.acao;
      parametroOS.matricula = this.autenticacaoFuncionario.matricula;
      parametroOS.senha = this.autenticacaoFuncionario.senha;
      parametroOS.usuarioId = this.autenticacaoFuncionario.usuarioId;

      if (this.data.acao == PausarOuFinalizar.Pausar) {
        this.serviceExecucaoDaOsService.pausar(this.osId, this.empresaAssociacaoId, parametroOS).subscribe((resp) => {
          this.dialogRef.close(true);
        });
      } else {

        let pendencia = new Pendencia();
        pendencia.setorId = this.data.setorId;
        pendencia.motivos = this.data.motivoIds;
        pendencia.planosSobreVida = this.data.planoSobreVida
        parametroOS.pendencia = pendencia

        this.serviceExecucaoDaOsService.finalizar(this.osId, this.empresaAssociacaoId, parametroOS).subscribe((resp) => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  confirmar(form: FormGroup) {

    if (this.data instanceof PausarOuFinalizarOs || this.data instanceof FinalizarOsPendencia) {
      this.pausarOuFinalizarOS(form);
    } else if (this.data instanceof OSFuncionario) {
      this.alocarFuncionarioParaOS(form)
    }
  }

  verificarMultiEmpresa() {
    if (this.autenticacaoFuncionario.matricula) {
      this.obterMultiEmpresa();
    } else {
      this.empresas = [];
    }
  }

  obterMultiEmpresa() {
    this.empresaFilialComponent.obterFuncionario(this.empresaAssociacaoId, this.autenticacaoFuncionario.matricula).subscribe((resp) => {
      this.empresas = resp;

      if (this.empresas.length > 0) {
        this.matriculaInvalida = false;
        this.dropdownDisabled = this.empresas.length == 1 && this.empresas[0].children.length == 1;
        if (this.dropdownDisabled)
          this.autenticacaoFuncionario.usuarioId = this.empresas[0].children[0].children[0].value;
      } else {
        this.matriculaInvalida = true;
        this.dropdownDisabled = true;
      }
    });
  }

  handleValueUpdated(value) {
    this.autenticacaoFuncionario.usuarioId = value;
  }

  OnChange() {
    this.verificaChangeForm = true
  }

Close(){
    if(this.verificaChangeForm){
        this.dialogConfirmService
        .confirm('Atenção', 'Existem alterações que foram feitas na tela e não foram salvas. Deseja realmente sair ?')
        .subscribe(res => {
          if (res) {
            this.dialogRef.close()
          }
        });
    } else {
      this.dialogRef.close()
    }
  }

  public ObterParametroApontador() {
    this.serviceAutenticacaoFuncionarioService.ObterParametroApontador().subscribe((resp) => {
      if (resp.data.apontadorParametro) {
        this.usuarioApontador = true
      } else {
        this.usuarioApontador = false
      }
    });
  }

  public GetRequiredSenha(){
    if(this.usuarioApontador){
      return false
    }else{
      return true
    }
  }

}
