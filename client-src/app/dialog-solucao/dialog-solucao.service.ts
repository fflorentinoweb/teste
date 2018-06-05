import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { FinalizarOSServicoFuncionario } from './../models/finalizar-os-servico-funcionario';
import { FinalizarOSDefeitoFuncionario } from './../models/finalizar-os-defeito-funcionario';

@Injectable()
export class DialogSolucaoService {

  constructor(public http: Http) { }

  public obterGruposServico(){
     return this.http.get("/GrupoServico/GruposParaFechamento")
      .map(res => res.json());
  }

  public obterServicos(grupoServicoId: number){
    return this.http.get("/Servico/AtivosPorGrupo/" + grupoServicoId)
      .map(res => res.json());
  }

  public obterTiposDeOperacao(){
    return this.http.get("/TipoDeOperacao")
      .map(res => res.json());
  }

  public trocasDeOleoPendentes(osId: Number, osServicoIds: Number[]){
    let params = new URLSearchParams();
    osServicoIds.forEach(x=> params.append("osServicoIds", x.toString()));

    return this.http.get("/OS/TrocasDeOleoPendentes/" + osId, {
        params: params.toString()
    }).map(resp => resp.json());
  }

  public finalizarServico(body: FinalizarOSServicoFuncionario){
    return this.http.patch("/OSServicoFuncionario/Finalizar", body)
      .map(res => res.json());
  }

  public finalizarDefeito(body: FinalizarOSDefeitoFuncionario){
    return this.http.patch("/OSDefeitoFuncionario/Finalizar", body)
      .map(res => res.json());
  }

  public ObterParametroApontador(){
    return this.http.get("/Parametro/Usuario/3")
    .map(res => res.json());
  }
}
