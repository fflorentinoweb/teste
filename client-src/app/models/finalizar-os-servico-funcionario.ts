import { FinalizarOSServico } from './finalizar-os-servico';
import { TrocaDeOleo } from './troca-de-oleo';

export class FinalizarOSServicoFuncionario {
    funcionarioId: number;
    osServicos: FinalizarOSServico[];
    senhaCriptografada: string;    
    trocasDeOleo: TrocaDeOleo[];
    
    constructor(funcionarioId: number, osServicos: FinalizarOSServico[], senhaCriptografada: string, trocasDeOleo?: TrocaDeOleo[]){
        this.funcionarioId = funcionarioId;
        this.osServicos = osServicos;
        this.senhaCriptografada = senhaCriptografada;
        this.trocasDeOleo = trocasDeOleo;
    }
}


