import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class DialogSolucaoCarouselService {

  constructor(public http: Http) { }

  public ObterParametroApontador(){
    return this.http.get("/Parametro/Usuario/3")
    .map(res => res.json());
  }
}
