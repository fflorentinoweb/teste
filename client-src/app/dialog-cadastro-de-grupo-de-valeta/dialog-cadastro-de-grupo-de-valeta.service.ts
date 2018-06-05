import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GrupoDeValeta } from "../models/grupo-de-valeta";

@Injectable()
export class DialogCadastroDeGrupoDeValetaService {
    constructor(public http: Http) { }

    public inserir(body: GrupoDeValeta){
        return this.http.post("/GrupoValeta/", body)
            .map(res => res.json());
    }

    public alterar(body: GrupoDeValeta){
        return this.http.put("/GrupoValeta/", body)
          .map(res => res.json());
    }

    public excluir(id: number){
        return this.http.delete("/GrupoValeta/" + id)
          .map(res => res.json());
    }

    public obterPorCodigo(codigo: number){
        return this.http.get("/GrupoValeta/Codigo/" + codigo)
            .map(res => res.json());
    }

    public obterProximoCodigo(){
        return this.http.get("/GrupoValeta/ProximoCodigo")
            .map(res => res.json());
    }
}
