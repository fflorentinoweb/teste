import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch'

import { GrupoDeFuncionarios } from "../models/grupo-de-funcionarios";

@Injectable()
export class DialogEditarGruposService {
    constructor(public http: Http) { }

    public inserirGrupo(body: GrupoDeFuncionarios){
        return this.http.post("/GrupoFuncionario", body)
            .map(res => res.json())
              .catch((error:any) => Observable.throw('erro'));
          
    }

    public excluir(descricaoId: number){
        return this.http.delete("/GrupoFuncionario/" + descricaoId)
          .map(res => res.json())
          .catch((error:any) => Observable.throw('erro'));
    }
}
