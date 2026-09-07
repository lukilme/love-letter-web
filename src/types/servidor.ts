export type Servidor = {
  nomeServidor: string;
  cpfServidor: string;
  nomeCargo: string;
  situacaoServidor: string;
  valorBruto: string;
  valorLiquido: string;
  orgaoLotacao: string;
  dataAdmissao: string;
  regimeContratual: string;
};

export type FilterOptions = {
  searchTerm: string;
  situacao: string;
  regime: string;
  minSalary: string;
  maxSalary: string;
};

export const EMPTY_FILTERS: FilterOptions = {
  searchTerm: "",
  situacao: "",
  regime: "",
  minSalary: "",
  maxSalary: "",
};
