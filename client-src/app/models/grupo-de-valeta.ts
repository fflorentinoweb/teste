export class GrupoDeValeta {
    id: number;
    codigo: number;
    descricao: string;

    constructor(codigo?: number){
        this.id = 0;
    
        if (codigo != null)
          this.codigo = codigo;
    }
}
