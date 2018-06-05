import { SolucaoDoDefeito } from './solucao-do-defeito';

export class OSSolucaoCarrossel{
    osServicoId: number;
    osDefeitoId: number;
    grupoServicoId: number;
    grupoServico: string;
    servico: string;
    opcoesServicos: any[];
    defeito: string;
    solucaoServicoId: number;    
    solucaoServico: string;
    tipoDeOperacaoId: number;
    tipoDeOperacao: string;
    planoDeRevisaoId: number;    
    complemento: string;
    solucoesDoDefeito: SolucaoDoDefeito[]
    exibeSolucoesDoDefeito: boolean;
    submitted: boolean;
    grupoServicoValid: boolean    
    grupoServicoDirty: boolean;   
    servicoValid: boolean;
    servicoDirty: boolean;
    tipoDeOperacaoValid: boolean;
    tipoDeOperacaoDirty: boolean;
    solucaoJaAdicionadaValid: boolean;
    
    constructor(){
        this.opcoesServicos = [];
        this.solucoesDoDefeito = [];
        this.exibeSolucoesDoDefeito = false;
        this.submitted = false;
        this.grupoServicoValid = false;   
        this.grupoServicoDirty = false;   
        this.servicoValid = false;
        this.servicoDirty = false;
        this.tipoDeOperacaoValid = false;
        this.tipoDeOperacaoDirty = false;
        this.solucaoJaAdicionadaValid = true;
    }
}