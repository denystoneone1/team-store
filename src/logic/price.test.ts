import { describe, expect, it } from 'vitest'
import { getBookPrice } from './price'

describe('getBookPrice', () => {
  it('adds page cost to base price', () => {
    expect(getBookPrice(300)).toBe(20)
  })

  it('rounds price to whole dollars', () => {
    expect(getBookPrice(123)).toBe(11)
    expect(getBookPrice(138)).toBe(12)
    expect(getBookPrice(130)).toBe(12)
  })

  it('returns the same price for the same number of pages', () => {
    expect(getBookPrice(250)).toBe(getBookPrice(250))
  })

  it('gives a higher price to a longer book', () => {
    expect(getBookPrice(800)).toBeGreaterThan(getBookPrice(200))
  })

  it('works with fractional number of pages', () => {
    expect(getBookPrice(150.5)).toBe(13)
  })

  it('returns default price when pages are missing', () => {
    expect(getBookPrice()).toBe(20)
    expect(getBookPrice(undefined)).toBe(20)
  })

  it('returns default price for zero or negative pages', () => {
    expect(getBookPrice(0)).toBe(20)
    expect(getBookPrice(-10)).toBe(20)
  })

  it('returns default price for NaN and Infinity', () => {
    expect(getBookPrice(Number.NaN)).toBe(20)
    expect(getBookPrice(Number.POSITIVE_INFINITY)).toBe(20)
  })
})
