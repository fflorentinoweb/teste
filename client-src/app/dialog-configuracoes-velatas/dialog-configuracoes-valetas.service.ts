import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ConfiguracoesValeta } from './../models/configuracoes-valeta';

@Injectable()
export class DialogConfiguracoesValetasService {

  constructor(public http: Http) { }

  public obterParametros(){
    return this.http.get("/Parametro/Usuario/1")
        .map(res => res.json());
  }

  public gravarParametros(body: ConfiguracoesValeta){
    return this.http.post("/Parametro/Usuario", body)
        .map(res => res.json());
  }

  public obterGrupoValetas(){
    return this.http.get("/GrupoValeta/ObterGruposAssociadosNaValeta")
        .map(res => res.json());
  }
}
