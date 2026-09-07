/**
 * Formata uma data para o padrão pt-BR.
 * Retorna "-" para valores nulos, vazios ou inválidos.
 * Exemplo: formatDate("2020-01-15") → "15/01/2020"
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "-";
  try {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  } catch {
    return String(date);
  }
}

/**
 * Formata um valor como moeda BRL.
 * Aceita number ou string bruta (ex: saída do DuckDB).
 * Exemplo: formatCurrency("1500.50") → "R$ 1.500,50"
 */
export function formatCurrency(value: number | string | null | undefined): string {
  const num = parseFloat(
    value?.toString().replace(/[^\d.-]/g, "") ?? "0"
  );
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(isNaN(num) ? 0 : num);
}
