// Funções utilitárias de formatação

/**
 * Formata uma data para o padrão pt-BR.
 * Exemplo: formatDate(new Date()) → "07/09/2026"
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

/**
 * Formata um valor numérico como moeda em BRL.
 * Exemplo: formatCurrency(1500) → "R$ 1.500,00"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
