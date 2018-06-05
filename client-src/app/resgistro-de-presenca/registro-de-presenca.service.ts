import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistroDePresencaService {

  constructor(public http: Http){}

  ObterFuncionarioPorEmpresaAssociacao(empreAssociacaoId: number){
    return this.http.get('/RegistroDePresenca/' + empreAssociacaoId)
      .map(res => res.json());
  }

 obterParametros(){
    return this.http.get("/Parametro/Usuario/2")
        .map(res => res.json());
  }
}
