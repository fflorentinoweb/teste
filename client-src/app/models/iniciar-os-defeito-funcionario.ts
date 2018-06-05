export class IniciarOSDefeitoFuncionario {
    funcionarioId : number;
    osId: number;
    empresaAssociacaoId: number;
    osDefeitoIds: number[];
    senhaCriptografada: string;

    constructor(funcionarioId: number, osId: number, empresaAssociacaoId: number, osDefeitoIds: number[], senhaCriptografada: string){
      this.funcionarioId = funcionarioId;
      this.osId = osId;
      this.empresaAssociacaoId = empresaAssociacaoId;
      this.osDefeitoIds = osDefeitoIds;
      this.senhaCriptografada = senhaCriptografada;
    }
}