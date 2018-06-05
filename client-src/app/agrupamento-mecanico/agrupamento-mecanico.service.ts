import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AgrupamentoMecanico } from '../models/agrupamento-mecanico'
import { GrupoFuncionarioAssociacao } from '../models/grupo-funcionario-associacao';

@Injectable()
export class AgrupamentoMecanicoService {

  constructor(public http: Http) {}

  obterGrupoDeMecanicos() {
    return this.http.get('/GrupoFuncionario')
      .map(res => res.json())
  }

  ObterFuncionarioPorEmpresaAssociacao(empresaAssociacaoId: number, grupoId: number){
    return this.http.get('/Funcionario/ObterFuncionarioPorEmpresaAssociacao/' + empresaAssociacaoId + '/' + grupoId)
      .map(res => res.json());
  }

  ObterFuncionariosPorGrupoIdEEmpresaAssociacaoId(IdGrupo: number, AssociacaoId:number){
    return this.http.get('/GrupoFuncionarioAssociacao/ObterFuncionariosPorGrupoIdEEmpresaAssociacaoId/' + IdGrupo + '/' + AssociacaoId)
    .map(res => res.json());
  }

  public inserirVinculoMecanico(body: GrupoFuncionarioAssociacao){
    return this.http.post("/GrupoFuncionarioAssociacao/", body)
        .map(res => res.json());
  }

  deletarVinculoMecanico(funcionarioId: number, grupoFuncionarioId: number, empresaAssociativaId: number){
    return this.http.delete("/GrupoFuncionarioAssociacao/" + funcionarioId + "/" + grupoFuncionarioId + "/" + empresaAssociativaId)
    .map(res => res.json());
  }
}
