import { PausarOuFinalizar } from "../enum/pausar-ou-finalizar.enum";

export class PausarOuFinalizarOs {
    osId: number;
    acao: PausarOuFinalizar;    

    constructor(osId: number, acao: PausarOuFinalizar) {
        this.osId = osId;
        this.acao = acao;
    }
}
