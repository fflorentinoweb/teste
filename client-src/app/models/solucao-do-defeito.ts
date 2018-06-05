export class SolucaoDoDefeito{
    osDefeitoId: number;
    grupoServico: string;
    solucaoServicoId: number;    
    solucaoServico: string;
    tipoDeOperacaoId: number;
    tipoDeOperacao: string;    
    complemento: string;
    
    constructor(osDefeitoId: number, grupoServico: string, solucaoServicoId: number, 
                solucaoServico:string, tipoDeOperacaoId: number, tipoDeOperacao: string, complemento: string ){
        
        this.osDefeitoId = osDefeitoId;
        this.grupoServico = grupoServico;
        this.solucaoServicoId = solucaoServicoId;
        this.solucaoServico = solucaoServico;
        this.tipoDeOperacaoId = tipoDeOperacaoId;
        this.tipoDeOperacao = tipoDeOperacao;
        this.complemento = complemento;
    }
}