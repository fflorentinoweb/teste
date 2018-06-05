import { Component, Inject, OnInit } from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { OsMecanicosService } from '../os-mecanicos/os-mecanicos.service';

@Component({
  selector: 'app-dialog-consulta-solucao',
  templateUrl: './dialog-consulta-solucao.component.html',
  styleUrls: ['./dialog-consulta-solucao.component.scss']
})
export class DialogConsultaSolucaoComponent implements OnInit {

solucoes: Object[] = [];

  constructor(
    public dialog: MdDialog,
    private service: OsMecanicosService,
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
    }	

  ngOnInit() {
      if(this.data.osServicoId > 0){
        this.obterServicoSolucao(this.data.osServicoId)
      }
      else{
        this.obterDefeitoSolucao(this.data.osDefeitoId)
      }
  }

  obterServicoSolucao(osServicoId: number){
      this.service.obterServicoSolucao(osServicoId).subscribe((resp)=> {
          this.solucoes = resp.data;          
      });   
  }

  obterDefeitoSolucao(osDefeitoId: number){
      this.service.obterDefeitoSolucao(osDefeitoId).subscribe((resp) => {
          this.solucoes = resp.data;
      });       
  }
}
