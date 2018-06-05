
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class TabsOverviewService {

  constructor(
      public http: Http,
      private authService: AuthService) { }

  public obterOS(garagemId: number){
    return this.http.get("/OS/OSAberta/" + garagemId)
      .map(res => res.json());
  }

  public obterVeiculos(garagemId: number){
      return this.http.get("/Veiculo/ObterListaVeiculosComOSAbertaOUAlocado/" + garagemId)
      .map(res => res.json());
  }

  public obterValetas(garagemId: number){
    return this.http.get("/Valeta/ValetasAtivas/" + garagemId)
      .map(res => res.json());
  }

  public obterOSValetaAtualPorOS(osId: number){
    return this.http.get("/OS/OSValetaAtual/" + osId)
      .map(res => res.json());
  }

  public ObterIdValetaAtualPorVeiculoId(veiculoId: number){
  return this.http.get("/OSVeiculoValeta/ObterIdValetaAtualPorVeiculoId/" + veiculoId)
    .map(res => res.json());
  }

  public entrar(body: any){
      return this.http.post("/OSVeiculoValeta/", body)
      .map(res => res.json());
  }

  public retirar(body: any){
      return this.http.patch("/OSVeiculoValeta/RetirarVeiculo/", body)
      .map(res => res.json());
  }

  public associarOSAValeta(body: any){
      return this.http.patch("/OSVeiculoValeta/AssociarOS/", body)
      .map(res => res.json());
  }
}
