const BASE_PRICE = 200
const PRICE_PER_PAGE = 1
const DEFAULT_PRICE = 500
const ROUND_STEP = 10

export function getBookPrice(pages?: number): number {
  if (pages === undefined || !Number.isFinite(pages) || pages <= 0) {
    return DEFAULT_PRICE
  }

  const rawPrice = BASE_PRICE + pages * PRICE_PER_PAGE

  return Math.round(rawPrice / ROUND_STEP) * ROUND_STEP
}
