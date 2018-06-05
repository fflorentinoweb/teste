import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { TreeviewItem } from 'ngx-treeview';


@Injectable()
export class EmpresaFilialService {

  constructor(private http: Http) {
  }
  public obterGaragem(){
      return this.http.get("/EmpresaAssociacao")
      .map((resp: Response) => {
        var service = resp.json();
        var retorno = [];

        for(var i = 0; i < service.data.length; i++){
          retorno.push(new TreeviewItem(service.data[i]));
        }

        return retorno;
      });
  }

  public obterFuncionario(empresaAssociacaoId: number, matricula: string){
    return this.http.get("/Filial/ObterMultiEmpresa/" + empresaAssociacaoId+ '/' + matricula)
    .map((resp: Response) => {
      var service = resp.json();
      var retorno = [];

      if(service.data){
        for(var i = 0; i < service.data.length; i++){
          retorno.push(new TreeviewItem(service.data[i]));
        }
      }

      return retorno;
    });
  }

}
