import { PlanoSobreVida } from './plano-sobre-vida';
import { PausarOuFinalizar } from "../enum/pausar-ou-finalizar.enum";
export class FinalizarOsPendencia {
    osId: number;
    setorId: number;
    motivoIds: number[];
    kmSobrevida: number;
    planoSobreVida: Array<PlanoSobreVida>
    acao: PausarOuFinalizar; 
    constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
