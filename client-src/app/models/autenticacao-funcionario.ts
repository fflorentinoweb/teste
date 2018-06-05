export class AutenticacaoFuncionario {
    usuarioId: number;
    matricula: string;
    senha: string;
    
    constructor(usuarioId?: number, matricula?: string, senha?: string) {
        this.usuarioId = usuarioId;
        this.matricula = matricula;
        this.senha = senha;
    }
}
