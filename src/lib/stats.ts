import type { Transaction, TxType } from '../types'

export interface MonthStats {
  income: number
  expense: number
  balance: number
}

export function filterByMonth(transactions: Transaction[], yearMonth: string): Transaction[] {
  return transactions.filter((t) => t.date.startsWith(yearMonth))
}

export function computeMonthStats(transactions: Transaction[]): MonthStats {
  let income = 0
  let expense = 0
  for (const t of transactions) {
    if (t.type === 'income') income += t.amount
    else expense += t.amount
  }
  return { income, expense, balance: income - expense }
}

export interface CategorySlice {
  category: string
  amount: number
  percent: number
}

export function categoryBreakdown(
  transactions: Transaction[],
  type: TxType,
): CategorySlice[] {
  const map = new Map<string, number>()
  let total = 0
  for (const t of transactions) {
    if (t.type !== type) continue
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
    total += t.amount
  }
  if (total === 0) return []
  return [...map.entries()]
    .map(([category, amount]) => ({
      category,
      amount,
      percent: Math.round((amount / total) * 100),
    }))
    .sort((a, b) => b.amount - a.amount)
}
