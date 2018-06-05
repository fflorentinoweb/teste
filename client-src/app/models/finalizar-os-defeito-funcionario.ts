import { FinalizarOSDefeito } from './finalizar-os-defeito';

export class FinalizarOSDefeitoFuncionario {
    funcionarioId: number;
    osDefeitos: FinalizarOSDefeito[];
    senhaCriptografada: string;

     constructor(funcionarioId: number, osDefeitos: FinalizarOSDefeito[], senhaCriptografada: string){
        this.funcionarioId = funcionarioId;
        this.osDefeitos = osDefeitos;
        this.senhaCriptografada = senhaCriptografada;
    }
}
