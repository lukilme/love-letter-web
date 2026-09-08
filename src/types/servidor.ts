export type Servidor = {
  // Período
  anoExercicio: string;
  mesReferencia: string;
  periodo: string;

  // Identificação
  nomeServidor: string;
  cpfServidor: string;
  matricula: string;

  // Admissão e perfil
  dataAdmissao: string;
  sexo: string;
  deficienteFisico: string;
  anosServico: string;
  ehAposentado: string;

  // Lotação e cargo
  administracao: string;
  tipoCargo: string;
  nomeCargo: string;
  situacaoServidor: string;
  regimeContratual: string;
  cargaHorariaServidor: string;
  escolaridadeMinimaCargo: string;
  cnpjOrgao: string;
  orgaoLotacao: string;
  nomeUnidadeTrabalho: string;
  siglaPoder: string;
  nomeOrgaoDisposicao: string;

  // Remuneração
  vantagemFixa: string;
  vantagemVariavel: string;
  valorRedutor: string;
  valorBruto: string;
  valorPrevidenciario: string;
  valorIr: string;
  descontoObrigatorio: string;
  valorDesconto: string;
  valorLiquido: string;

  // Classificação
  faixaRemuneracao: string;
  descontosPercentual: string;
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
