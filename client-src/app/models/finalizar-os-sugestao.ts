export class FinalizarOsSugestao {
    funcionarioId : number;
    senhaCriptografada: string;

    constructor(funcionarioId: number, senhaCriptografada: string){
      this.funcionarioId = funcionarioId;
      this.senhaCriptografada = senhaCriptografada;
    }
}
