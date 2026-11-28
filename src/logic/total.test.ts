import { describe, expect, it } from 'vitest'
import type { Book, CartItem } from '../types'
import { calculateTotal } from './total'

function makeItem(price: number, quantity = 1): CartItem {
  const book: Book = {
    id: `book-${price}`,
    title: 'Test book',
    author: 'Test author',
    category: 'fantasy',
    price,
  }

  return { book, quantity }
}

describe('calculateTotal', () => {
  it('returns zeros for an empty cart', () => {
    expect(calculateTotal([])).toEqual({ subtotal: 0, discount: 0, total: 0 })
  })

  it('returns zeros for an empty cart with a promo code', () => {
    expect(calculateTotal([], 'SALE10')).toEqual({ subtotal: 0, discount: 0, total: 0 })
  })

  it('sums prices of several books', () => {
    const items = [makeItem(500), makeItem(320)]

    expect(calculateTotal(items)).toEqual({ subtotal: 820, discount: 0, total: 820 })
  })

  it('multiplies price by quantity', () => {
    const items = [makeItem(500, 3), makeItem(200, 2)]

    expect(calculateTotal(items).subtotal).toBe(1900)
  })

  it('applies 10% discount for SALE10', () => {
    const items = [makeItem(500, 2)]

    expect(calculateTotal(items, 'SALE10')).toEqual({ subtotal: 1000, discount: 100, total: 900 })
  })

  it('accepts promo code in any case and with spaces around', () => {
    const items = [makeItem(500, 2)]

    expect(calculateTotal(items, ' sale10 ').discount).toBe(100)
  })

  it('gives no discount for an unknown promo code', () => {
    const items = [makeItem(500, 2)]

    expect(calculateTotal(items, 'SALE50')).toEqual({ subtotal: 1000, discount: 0, total: 1000 })
  })

  it('gives no discount for an empty promo code', () => {
    const items = [makeItem(500, 2)]

    expect(calculateTotal(items, '').discount).toBe(0)
    expect(calculateTotal(items, '   ').discount).toBe(0)
  })

  it('does not accumulate discount on repeated calls', () => {
    const items = [makeItem(500, 2)]

    calculateTotal(items, 'SALE10')

    expect(calculateTotal(items, 'SALE10').total).toBe(900)
  })

  it('does not change the cart', () => {
    const items = [makeItem(500, 2)]
    const copy = structuredClone(items)

    calculateTotal(items, 'SALE10')

    expect(items).toEqual(copy)
  })

  it('avoids floating point errors', () => {
    const items = [makeItem(0.1), makeItem(0.2)]

    expect(calculateTotal(items).subtotal).toBe(0.3)
  })

  it('rounds discount to cents', () => {
    const items = [makeItem(333.33)]

    expect(calculateTotal(items, 'SALE10')).toEqual({ subtotal: 333.33, discount: 33.33, total: 300 })
  })
})
