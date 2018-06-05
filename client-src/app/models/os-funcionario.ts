export class OSFuncionario {
    osId: number;
    matricula: string;
    usuarioId: number

    constructor(osId: number, matricula?: string, usuarioId?: number) {
        this.osId = osId;
        this.matricula = matricula;
        this.usuarioId = usuarioId;
    }
}