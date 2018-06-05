import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OsMecanicosService {

  constructor(public http: Http) { }

  public obterServicosParaFuncionario(osId: number, funcionarioId: number, senha: string){
    let headers = new Headers();
    headers.append('senhaCriptografada', senha );

    return this.http.get("/OSServicoFuncionario/OSServicosParaFuncionario/" + osId + "/" + funcionarioId, {
      headers: headers
    }).map(resp=> resp.json());
  }

  public iniciarServicos(body: any){
    return this.http.post("/OSServicoFuncionario/", body)
      .map(resp => resp.json());
  }

  public pausarServicos(body: any){
    return this.http.patch("/OSServicoFuncionario/Pausar", body)
      .map(resp => resp.json());
  }

  public revogarServicos(body: any){
    return this.http.patch("/OSServicoFuncionario/Revogar", body)
      .map(resp => resp.json());
  }

  public desfazerServicos(funcionarioId: number, osServicoIds: any[], senha: string){

    let params = new URLSearchParams();
    osServicoIds.forEach(x=> params.append("osServicoIds", x.toString()));

    let headers = new Headers();
    headers.append('senhaCriptografada', senha );

    return this.http.delete("/OSServicoFuncionario/Desfazer/" + funcionarioId, {
      headers: headers,
      params: params.toString()
    }).map(resp => resp.json());
  }

  public iniciarDefeitos(body: any){
    return this.http.post("/OSDefeitoFuncionario", body)
      .map(resp => resp.json());
  }

  public pausarDefeitos(body: any){
    return this.http.patch("/OSDefeitoFuncionario/Pausar", body)
      .map(resp => resp.json());
  }

  public revogarDefeitos(body: any){
    return this.http.patch("/OSDefeitoFuncionario/Revogar", body)
      .map(resp => resp.json());
  }

  public desfazerDefeitos(funcionarioId: number, osDefeitoIds: any[], senha: string){

    let params = new URLSearchParams();
    osDefeitoIds.forEach(x=> params.append("osDefeitoIds", x.toString()));

    let headers = new Headers();
    headers.append('senhaCriptografada', senha );

    return this.http.delete("/OSDefeitoFuncionario/Desfazer/" + funcionarioId, {
      headers: headers,
      params: params.toString()
    }).map(resp => resp.json());
  }

  public obterServicoSolucao(osServicoId: number){
    return this.http.get("/OSServicoFuncionario/Solucoes/" + osServicoId).map(resp => resp.json());
  }

  public obterDefeitoSolucao(osDefeitoId: number){
    return this.http.get("/OSDefeitoFuncionario/Solucoes/" + osDefeitoId).map(resp => resp.json());
  }

  public osServicosFinalizados(osId: number){
    return this.http.get("/OS/OSServicosFinalizados/" + osId).map(resp => resp.json());
  }

  public finalizarOS(osId: number, body: any){

    return this.http.patch("/OS/FinalizarOSSugestao/" + osId, body)
      .map(resp => resp.json());
  }
}
