export const CATEGORIES = ['fantasy', 'science_fiction', 'history', 'children'] as const

export type Category = (typeof CATEGORIES)[number]

export interface Book {
  id: string
  title: string
  author: string
  category: Category
  price: number
  cover?: string
  year?: number
  pages?: number
}

export interface CartItem {
  book: Book
  quantity: number
}
