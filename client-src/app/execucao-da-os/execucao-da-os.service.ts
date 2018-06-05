import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExecucaoDaOsService {
 
  constructor(public http: Http) { }

  public ObterOsPainelExecucao(osId: Number){
    return this.http.get("/OS/ObterOsPainelExecucao/" + osId)
    .map(resp => resp.json());
  }
  
  public ObterServicosFinalizado(osId: Number){
    return this.http.get("/OS/OSServicosFinalizados/" + osId)
    .map(resp => resp.json());
  }

  public ObterOSServicosEmExecucao(veiculoId: Number){
    return this.http.get("/OS/OSServicosEmExecucao/" + veiculoId)
    .map(resp => resp.json());
  }
  
  public pausar(osId: Number, empresaAssociacaoId: number, body: any){
  return this.http.patch("/OS/PausarOuFinalizar/" + osId + '/'+ empresaAssociacaoId, body)
    .map(resp => resp.json());
  }

  public finalizar(osId: Number, empresaAssociacaoId: number,  body: any){
  return this.http.patch("/OS/PausarOuFinalizar/" + osId + '/'+ empresaAssociacaoId, body)
    .map(resp => resp.json());
  }
   
  public patchRetirarVeiculoValeta(body: any) {
    return this.http.patch("/OSVeiculoValeta/RetirarVeiculo/", body)
    .map(resp => resp.json());
  }
}