import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Http, Headers, RequestOptions} from '@angular/http';

import { AutenticacaoFuncionario } from "../models/autenticacao-funcionario";
import {DialogAutenticacaoFuncionarioComponent} from "./dialog-autenticacao-funcionario.component";

@Injectable()
export class DialogAutenticacaoFuncionarioService {
  constructor(public http: Http, private dialog: MdDialog) { }

  public autenticarFuncionario(empresaAssociacaoId: number, form: AutenticacaoFuncionario){

    let headers = new Headers();
    headers.append('senha', form.senha );

    return this.http.get("/Funcionario/IdentificacaoComApontador/" + empresaAssociacaoId + '/' + form.matricula + '/' + form.usuarioId, {
      headers: headers
    }).map(resp=> resp.json());
  }

  public ObterParametroApontador(){
    return this.http.get("/Parametro/Usuario/3")
    .map(res => res.json());
  }
}









