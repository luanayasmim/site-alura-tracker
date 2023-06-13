export enum TipoNotificacao{
    SUCESSO,
    ALERTA,
    ERRO
}

export interface INotificacao{
    id: number
    titulo: string;
    tipo: TipoNotificacao;
    texto: string;
}