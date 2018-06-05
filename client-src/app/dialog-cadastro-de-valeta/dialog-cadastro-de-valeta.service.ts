import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Valeta } from "../models/valeta";

@Injectable()
export class DialogCadastroDeValetaService {
    constructor(public http: Http) { }

    public inserir(body: Valeta){
        return this.http.post("/Valeta/", body)
            .map(res => res.json());
    }

    public alterar(body: Valeta){
        return this.http.put("/Valeta/", body)
          .map(res => res.json());
    }

    public excluir(id: number){
        return this.http.delete("/Valeta/" + id)
          .map(res => res.json());
    }

    public obterPorCodigo(codigo: number, empresaAssociacaoId: number){
        return this.http.get("/Valeta/Codigo/" + codigo + "/" + empresaAssociacaoId)
            .map(res => res.json());
    }

    public obterProximoCodigo(empresaAssociacaoId: number){
        return this.http.get("/Valeta/ProximoCodigo/" + empresaAssociacaoId)
            .map(res => res.json());
    }

    public obterGrupoValetas(){
        return this.http.get("/GrupoValeta")
            .map(res => res.json());
    }
}
