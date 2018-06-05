export class FinalizarOSDefeitoServico{
    servicoId: number;
    tipoDeOperacaoId: number;
    complemento: string;

    constructor(servicoId: number, tipoDeOperacaoId: number, complemento: string){
        this.servicoId = servicoId;
        this.tipoDeOperacaoId = tipoDeOperacaoId;
        this.complemento = complemento;
    }
}