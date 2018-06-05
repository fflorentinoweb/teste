import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogCadastroTipoOleoService {

  constructor(
    private dialog: MdDialog,
    public http: Http) { }


  public obterPlanoRevisao(planoDeRevisaoId: Number){
    return this.http.get("/PlanoDeRevisao/"+ planoDeRevisaoId)
      .map(res => res.json());
  }
    
  public ObterOleosPorTipo(empresaAssociacaoID: Number, tipoOleo: Number){
    return this.http.get("/Oleo/TipoOleo/"+ empresaAssociacaoID + "/" + tipoOleo)
      .map(res => res.json());
  }
    
  public ObterOleosMotor(idVeiculo: Number){
    return this.http.get("/Oleo/TipoOleoMotorPorVeiculo/"+ idVeiculo)
      .map(res => res.json());
  }

  public ObterSaldoOleoPorId(oleoId: Number){
    return this.http.get("/Oleo/ObterSaldoOleoPorId/" + oleoId).map(res => res.json()); 
  }
  public CarregarCapacidadeLitrosOleoPorIdVeiculo(veiculoId: Number) {
      return this.http.get("/Oleo/ObterCapacidadeLitrosOleoPorIdVeiculo/" + veiculoId)
          .map(res => res.json());
  }

  public obterTrocaDeOleoJaExecutadoPorOS(osId: Number, tipoOleo: Number) {
      return this.http.get("/PlanoDeRevisao/ObterTrocaDeOleoJaExecutadoPorOS/" + osId + "/" + tipoOleo)
          .map(res => res.json());
  }

  public ObterParametroApontador(){
    return this.http.get("/Parametro/Usuario/3")
    .map(res => res.json());
  }
}
