import { useCallback, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEY } from '../constants'
import { categoryBreakdown, computeMonthStats, filterByMonth } from '../lib/stats'
import type { FinanceState, Transaction } from '../types'

function loadState(): FinanceState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { transactions: [], theme: 'system' }
    const parsed = JSON.parse(raw) as FinanceState
    return {
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      theme: parsed.theme ?? 'system',
    }
  } catch {
    return { transactions: [], theme: 'system' }
  }
}

function saveState(state: FinanceState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function applyTheme(theme: FinanceState['theme']) {
  const root = document.documentElement
  const dark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  root.classList.toggle('dark', dark)
}

export function useFinanceStore(yearMonth: string, search: string) {
  const [state, setState] = useState<FinanceState>(loadState)

  useEffect(() => {
    saveState(state)
    applyTheme(state.theme)
  }, [state])

  useEffect(() => {
    if (state.theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [state.theme])

  const monthTx = useMemo(
    () => filterByMonth(state.transactions, yearMonth),
    [state.transactions, yearMonth],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return monthTx
    return monthTx.filter(
      (t) =>
        t.note.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.amount).includes(q),
    )
  }, [monthTx, search])

  const stats = useMemo(() => computeMonthStats(monthTx), [monthTx])
  const expenseBreakdown = useMemo(
    () => categoryBreakdown(monthTx, 'expense'),
    [monthTx],
  )
  const incomeBreakdown = useMemo(
    () => categoryBreakdown(monthTx, 'income'),
    [monthTx],
  )

  const add = useCallback((tx: Omit<Transaction, 'id'>) => {
    setState((s) => ({
      ...s,
      transactions: [{ ...tx, id: crypto.randomUUID() }, ...s.transactions],
    }))
  }, [])

  const update = useCallback((id: string, patch: Partial<Transaction>) => {
    setState((s) => ({
      ...s,
      transactions: s.transactions.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }))
  }, [])

  const remove = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      transactions: s.transactions.filter((t) => t.id !== id),
    }))
  }, [])

  const setTheme = useCallback((theme: FinanceState['theme']) => {
    setState((s) => ({ ...s, theme }))
  }, [])

  const importData = useCallback((transactions: Transaction[]) => {
    setState((s) => ({ ...s, transactions }))
  }, [])

  const allTimeBalance = useMemo(() => {
    const all = computeMonthStats(state.transactions)
    return all.balance
  }, [state.transactions])

  return {
    transactions: filtered,
    allTransactions: state.transactions,
    theme: state.theme,
    stats,
    expenseBreakdown,
    incomeBreakdown,
    allTimeBalance,
    add,
    update,
    remove,
    setTheme,
    importData,
  }
}
