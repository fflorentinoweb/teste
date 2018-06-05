export class Valeta {
    id: number;
    codigo: number;
    descricao: string;
    tipo: number;
    quantidadeVeiculos: number;  
    ativa: boolean;
    grupoValetaId: number;
    empresaAssociacaoId: number;

    constructor(codigo?: number, empresaAssociacaoId?: number){
        this.id = 0;
        this.ativa = true;
        this.tipo = 0;
        this.quantidadeVeiculos = 1;
        this.empresaAssociacaoId = empresaAssociacaoId;
        
        if (codigo != null)
          this.codigo = codigo;
    }
}
