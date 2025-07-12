export interface CotacaoDolar {
  codigo: string;
  codigoPara: string;
  nome: string;
  bid: string;
  ask: string;
  timestamp: string;
  dataCriacao: string;
}

export interface RespostaApi {
  USDBRL: CotacaoDolar;
}
