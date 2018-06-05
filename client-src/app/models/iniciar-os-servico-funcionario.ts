export class IniciarOSServicoFuncionario {
    funcionarioId : number;
    osId: number;
    empresaAssociacaoId: number;
    osServicoIds: number[];
    senhaCriptografada: string;

    constructor(funcionarioId: number, osId: number, empresaAssociacaoId: number, osServicoIds: number[], senhaCriptografada: string){
      this.funcionarioId = funcionarioId;
      this.osId = osId;
      this.empresaAssociacaoId = empresaAssociacaoId;
      this.osServicoIds = osServicoIds;
      this.senhaCriptografada = senhaCriptografada;
    }
}