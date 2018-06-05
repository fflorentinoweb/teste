export class FinalizarOSServico{
    osServicoId: number;
    solucaoServicoId: number;
    solucaoTipoDeOperacaoId: number;
    complemento: string;

    constructor(osServicoId: number, solucaoServicoId: number, solucaoTipoDeOperacaoId: number, complemento: string){
        this.osServicoId = osServicoId;
        this.solucaoServicoId = solucaoServicoId;
        this.solucaoTipoDeOperacaoId = solucaoTipoDeOperacaoId;
        this.complemento = complemento;
    }
}