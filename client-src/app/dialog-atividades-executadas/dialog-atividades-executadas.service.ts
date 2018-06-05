import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DialogAtividadesExecutadasService {

  constructor(public http: Http) { }
  
  ObterDetalhesAtividadesFuncionario(osId: number, funcionarioId: number){
    return this.http.get('/RegistroDePresenca/ObterDetalhes/'+osId+'/'+funcionarioId)
    .map(resp => resp.json());
  }

}
