export class GrupoFuncionarioAssociacao {

    funcionarioId: number;
    grupoFuncionarioId: number;
    empresaAssociacaoId: number

    constructor(funcionarioId: number, grupoFuncionarioId: number, empresaAssociacaoId: number){
        this.funcionarioId = funcionarioId;
        this.grupoFuncionarioId = grupoFuncionarioId;
        this.empresaAssociacaoId = empresaAssociacaoId;
    }
}
