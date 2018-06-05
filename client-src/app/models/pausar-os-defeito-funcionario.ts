export class PausarOSDefeitoFuncionario {
    funcionarioId : number;
    osDefeitoIds: number[];
    senhaCriptografada: string;

    constructor(funcionarioId: number, osDefeitoIds: number[], senhaCriptografada: string){
      this.funcionarioId = funcionarioId;
      this.osDefeitoIds = osDefeitoIds;
      this.senhaCriptografada = senhaCriptografada;
    }
}