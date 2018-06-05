export class PausarOSServicoFuncionario {
    funcionarioId : number;
    osServicoIds: number[];
    senhaCriptografada: string;

    constructor(funcionarioId: number, osServicoIds: number[], senhaCriptografada: string){
      this.funcionarioId = funcionarioId;
      this.osServicoIds = osServicoIds;
      this.senhaCriptografada = senhaCriptografada;
    }
}