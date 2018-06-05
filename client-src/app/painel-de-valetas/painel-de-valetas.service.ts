import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfiguracoesValetaConteudo } from './../models/configuracoes-valeta-conteudo';

@Injectable()
export class PainelDeValetasService {

  constructor(public http: Http) { }

  public obterPainel(configuracoesValetaConteudo: ConfiguracoesValetaConteudo){
    let params = new URLSearchParams();

    if(configuracoesValetaConteudo.grupoValetaIds){
      configuracoesValetaConteudo.grupoValetaIds.forEach(x=> params.append("grupoIds", x));
    }
    
    return this.http.get("/Valeta/ObterPainel/" + configuracoesValetaConteudo.garagemId, { 
      params: params.toString()
    }).map(resp => resp.json());
  }

}
