import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DialogEncerramentoOsPendenciaService {

  constructor(public http: Http) { }

  public ObterListaSetores(){
    return this.http.get("/Setor/ObterLista/")
    .map(resp => resp.json());
  }

  public ObterListaMotivo(osId: number){
    return this.http.get("/OS/ObterListaMotivo/" + osId)
    .map(resp => resp.json());
  }

  public ObterListaPlanosDeRevisao(osId: number){
    return this.http.get("/OS/ObterPlanosSobreVida/" + osId)
    .map(resp => resp.json());
  }

  public ObterParametroApontador(){
    return this.http.get("/Parametro/Usuario/3")
    .map(res => res.json());
  }
  
}
