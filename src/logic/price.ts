const BASE_PRICE = 5
const PAGES_PER_DOLLAR = 20
const DEFAULT_PRICE = 20

export function getBookPrice(pages?: number): number {
  if (pages === undefined || !Number.isFinite(pages) || pages <= 0) {
    return DEFAULT_PRICE
  }

  const rawPrice = BASE_PRICE + pages / PAGES_PER_DOLLAR

  return Math.round(rawPrice)
}
