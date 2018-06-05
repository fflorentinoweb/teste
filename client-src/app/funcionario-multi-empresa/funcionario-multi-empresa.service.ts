import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { TreeviewItem } from 'ngx-treeview';

@Injectable()
export class FuncionarioMultiEmpresaService {

  constructor(private http: Http) {
  }
  public ObterMultiEmpresa(empresaAssociacaoId: number, matricula: string){
      return this.http.get("/Filial/ObterMultiEmpresa/" + empresaAssociacaoId+ '/' + matricula)
      .map((resp: Response) => {
        var service = resp.json();
        var retorno = [];

        for(var i = 0; i < service.data.length; i++){
          retorno.push(new TreeviewItem(service.data[i]));
        }

        return retorno;
      });
  }

}