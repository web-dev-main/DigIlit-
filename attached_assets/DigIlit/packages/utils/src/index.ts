export function formatCurrencyFromCents(cents: number, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(cents / 100);
}
