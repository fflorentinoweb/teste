import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class DialogConfiguracoesRegistroDePresencaService {

  constructor(public http: Http) { }

  public obterParametros(){
    return this.http.get("/Parametro/Usuario/2")
        .map(res => res.json());
  }

  public gravarParametros(body){
    return this.http.post("/Parametro/Usuario", body)
        .map(res => res.json());
  }
}
