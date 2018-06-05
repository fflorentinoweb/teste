import { FinalizarOSDefeitoServico } from './finalizar-os-defeito-servico';

export class FinalizarOSDefeito{
    osDefeitoId: number;
    servicos: FinalizarOSDefeitoServico[];

    constructor(osDefeitoId: number, servicos: FinalizarOSDefeitoServico[]){
        this.osDefeitoId = osDefeitoId;
        this.servicos = servicos;
    }
}