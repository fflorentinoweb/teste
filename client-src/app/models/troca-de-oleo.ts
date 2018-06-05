export class TrocaDeOleo{
     osId: number;
     planoDeRevisaoId: number;
     veiculoId: number;
     tipoTrocaDeOleo: number;
     oleoId: number;
     quantidade: number;
     desabilitado: boolean;
     oleoValid: boolean;
     oleoDirty: boolean;     
     quantidadeValid: boolean;
     capacidadeLitros: number; 
     descricaoTipoOleo: string;    
     saldo: number;
     constructor(osId:number, planoDeRevisaoId:number, veiculoId:number, tipoTrocaDeOleo:number, oleoId:number, quantidade:number){
        this.osId = osId;
        this.planoDeRevisaoId = planoDeRevisaoId;
        this.veiculoId = veiculoId;
        this.tipoTrocaDeOleo = tipoTrocaDeOleo;
        this.oleoId = oleoId;
        this.quantidade = quantidade;
        this.desabilitado = this.oleoId != null && this.quantidade != null;
        this.oleoValid = this.desabilitado;
        this.quantidadeValid = this.desabilitado;        
    }
}
