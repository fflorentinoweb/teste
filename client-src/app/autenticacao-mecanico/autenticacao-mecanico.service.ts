import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AutenticacaoMecanico } from './../models/autenticacao-mecanico';

@Injectable()
export class AutenticacaoMecanicoService {
  public token: string;
  
  constructor(private http: Http) { }

  public loginMecanico(body: AutenticacaoMecanico){
    return this.http.post("/Funcionario/RegistrarEntradaOuSaidaFuncionario", body).map(res => res.json());
  }

  public ObterParametroApontador(){
    return this.http.get("/Parametro/Usuario/3")
        .map(res => res.json());
  }
  
}
