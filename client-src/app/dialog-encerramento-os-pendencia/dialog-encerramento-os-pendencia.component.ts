import { OsPlanoDeRevisao } from './../models/os-plano-de-revisao';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { DialogAutenticacaoFuncionarioComponent } from '../dialog-autenticacao-funcionario/dialog-autenticacao-funcionario.component';

import { DialogEncerramentoOsPendenciaService } from './dialog-encerramento-os-pendencia.service'
import { DialogResultErrorService } from "../dialog-result-error/dialog-result-error.service";
import { DialogConfirmService } from "../dialog-confirm/dialog-confirm.service";
import { ExecucaoDaOsService } from "../execucao-da-os/execucao-da-os.service";
import { FinalizarOsPendencia } from "../models/finalizar-os-pendencia";
import { VeiculoValeta } from "../models/veiculo-valeta";
import { PlanoSobreVida } from './../models/plano-sobre-vida';

import { Motivo } from "../enum/motivo.enum";
import { PausarOuFinalizar } from "../enum/pausar-ou-finalizar.enum";



@Component({
  selector: 'app-dialog-encerramento-os-pendencia',
  templateUrl: './dialog-encerramento-os-pendencia.component.html',
  styleUrls: ['./dialog-encerramento-os-pendencia.component.scss']
})
export class DialogEncerramentoOsPendenciaComponent implements OnInit {
    public mask;
    finalizarOsPendencia: FinalizarOsPendencia;
    planoSobreVida: PlanoSobreVida;
    listaPlanoSobreVida: PlanoSobreVida[] = [];
    osId:number = null;
    setores: Object[] = [];
    setorId: number;
    valetaId: number;
    veiculoId: number;
    kmSobrevidaFormat: Number;
    optionsMotivo = [];
    myMotivo: Motivo;
    selectSobrevida: boolean = false;
    digitString: boolean = false;
    dialogAuth: MdDialogRef<DialogAutenticacaoFuncionarioComponent>;
    usuarioApontador: boolean = false;    

    //VALIDAÇÃO
    submitted: boolean = false;
    validationSetorValid: boolean = false;
    validationSetorDirty: boolean = false;
    validationMotivoValid: boolean = false;
    validationMotivoDirty: boolean = false;
    process = false;
    planosDeRevisao = []
    verificaChangeForm: boolean = false

    constructor(
    private dialogRef: MdDialogRef<DialogEncerramentoOsPendenciaComponent>,
    private dialog: MdDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: DialogEncerramentoOsPendenciaService,
    private serviceOS: ExecucaoDaOsService,
    private notifyService: DialogResultErrorService,
    private dialogConfirmService: DialogConfirmService,
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

        this.mask = createNumberMask({
            prefix: '',
            decimalLimit: 2,
            decimalSymbol: '.'
        });
    }

    ngOnInit() {
        this.finalizarOsPendencia = new FinalizarOsPendencia();
        this.planoSobreVida = new PlanoSobreVida();
        this.ObterParametroApontador();
        this.ObterListaSetores();
        this.ObterListaMotivo();    
    }

    public ObterParametroApontador() {
        this.service.ObterParametroApontador().subscribe((resp) => {
          if (resp.data.apontadorParametro) {
            this.usuarioApontador = true
          } else {
            this.usuarioApontador = false
          }
        });
      }

    ObterListaSetores(){
        this.service.ObterListaSetores().subscribe((resp) => {
            this.setores = resp.data;
        })
    }

    ObterListaMotivo(){
        this.service.ObterListaMotivo(this.data.osId).subscribe((resp) => {
            this.optionsMotivo = resp.data;
        })
    }

    displayMotivos(motivo) {
		return motivo.descricao
	}


    onValueChanged(event){

        this.verificaChangeForm = true        

        var motivoId = null;
        var motivoIds = [];


        if(event.value.length == 0){
            this.validationMotivoValid = false;
        }else if(event.value.length > 0){
            this.validationMotivoValid = true;
            this.validationMotivoDirty = true;
        }

        for(var i = 0; i < event.value.length; i++){
            motivoId = event.value[i];
            motivoIds.push(motivoId);

            this.finalizarOsPendencia.motivoIds = motivoIds;

            if(motivoId === 3){
                this.selectSobrevida = true;
                this.ObterPlanosDeRevisao();
                return;
            } else{
                this.selectSobrevida = false;
            }
        }
    }

    ObterPlanosDeRevisao(){
        this.service.ObterListaPlanosDeRevisao(this.data.osId).subscribe((resp) => {
            this.planosDeRevisao = resp.data;

            for(var i = 0; i < this.planosDeRevisao.length; i++){
                this.planosDeRevisao[i].kmSobrevida = this.planoSobreVida.km;
                this.planosDeRevisao[i].observacao = this.planoSobreVida.observacao;                
            }
        })
    }

    verificarSetor(data){
        if(data.setorId  == undefined || data.setorId == null){
            this.validationSetorValid = false;
        }else {
            this.verificaChangeForm = true            
            this.validationSetorValid = true;
            this.validationSetorDirty = true;
        }
    }

    finalizar(form: FormGroup){
        this.submitted = true;

        var a = String(this.finalizarOsPendencia.kmSobrevida);
        this.kmSobrevidaFormat = Number(a.replace(",", "."));

        let validationKmSobrevida = form.controls.kmSobrevida;

        for(var i = 0; i < this.planosDeRevisao.length; i++){
            if(this.planosDeRevisao[i].kmSobrevida == 0){
                return
            }
        }
        

        if (form.valid && this.validationSetorValid && this.validationMotivoDirty) {
            this.process = true;
            if (validationKmSobrevida) {
                if (validationKmSobrevida.value == 0) {
                    this.process = false;
                    return;
                }
            }

            for(var i = 0; i < this.planosDeRevisao.length; i++){
                
                this.listaPlanoSobreVida[i] = new PlanoSobreVida();
                this.listaPlanoSobreVida[i].PlanoDeRevisaoId = this.planosDeRevisao[i].id;
                this.listaPlanoSobreVida[i].km = this.planosDeRevisao[i].kmSobrevida;
                this.listaPlanoSobreVida[i].observacao = this.planosDeRevisao[i].observacao;
                
            }
            

            this.dialogAuth = this.dialog.open(DialogAutenticacaoFuncionarioComponent, {
                width: '650px',
                data: new FinalizarOsPendencia({
                    osId: this.data.osId,
                    setorId: this.finalizarOsPendencia.setorId,
                    motivoIds: this.finalizarOsPendencia.motivoIds, 
                    planoSobreVida: this.listaPlanoSobreVida,
                    acao: PausarOuFinalizar.Finalizar
                }),
                disableClose:true
            });

            this.process = false;
        
            this.dialogAuth.afterClosed().subscribe((resp) => {
                if (resp){
                    this.serviceOS.ObterOSServicosEmExecucao(this.data.veiculoId).subscribe((resp) => {
                        const retorno = resp.data;
                        var str = retorno.join(", ");
                        let msg = resp.data.length > 0 ? 'Existem serviços em execução na(s) OS: ' + str + '. Ao retirar o veículo da valeta eles serão pausados. Deseja retirar?': 'Deseja retirar o veículo da valeta?';
     
                        var empresaAssociacao = JSON.parse(localStorage.getItem('empresaAssociacao'));
                        
                        this.dialogConfirmService
                        .confirm('Atenção', msg)
                        .subscribe(resDialog => {
                            if(resDialog){
                                let veiculoValeta = new VeiculoValeta({
                                    veiculoId: this.data.veiculoId, 
                                    valetaId: this.data.valetaId
                                });

                                this.serviceOS.patchRetirarVeiculoValeta(veiculoValeta).subscribe((resp) => {
                                    this.router.navigate(['./AlocacaoOsVeiculo/' + empresaAssociacao.id]);
                                });
                            }else{
                                this.notifyService.showWarning('Atenção', 'O veículo permanecerá alocado na valeta até que seja retirado.');
                                this.router.navigate(['./AlocacaoOsVeiculo/' + empresaAssociacao.id]);
                            }
                            this.dialog.closeAll();
                        });
                    });
                }
            });
        }
    }

    digitStringEvent(e){
    this.digitString = e;
  }

  OnChange(){
    this.verificaChangeForm = true
}

Close(){
    if(this.verificaChangeForm){
        this.dialogConfirmService
        .confirm('Atenção', 'Existem alterações que foram feitas na tela e não foram salvas. Deseja realmente sair ?')
        .subscribe(res => {
            if (res){
             this.dialogRef.close()
            }
        });
    }else{
        this.dialogRef.close()
    }
}

getIndex(accordion: any){
    return this.planosDeRevisao.indexOf(accordion);
}

}
