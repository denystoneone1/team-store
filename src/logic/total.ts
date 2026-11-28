import type { CartItem } from '../types'

export interface CartTotal {
  subtotal: number
  discount: number
  total: number
}

const PROMO_CODES: Record<string, number> = {
  SALE10: 0.1,
}

function toCents(value: number): number {
  return Math.round(value * 100)
}

function getDiscountRate(promo?: string): number {
  if (!promo) {
    return 0
  }

  return PROMO_CODES[promo.trim().toUpperCase()] ?? 0
}

export function calculateTotal(items: CartItem[], promo?: string): CartTotal {
  const subtotalCents = items.reduce(
    (sum, item) => sum + toCents(item.book.price) * item.quantity,
    0,
  )
  const discountCents = Math.round(subtotalCents * getDiscountRate(promo))
  const totalCents = subtotalCents - discountCents

  return {
    subtotal: subtotalCents / 100,
    discount: discountCents / 100,
    total: totalCents / 100,
  }
}
