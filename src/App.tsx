import { useCallback, useState } from 'react'
import { CategoryBreakdown } from './components/CategoryBreakdown'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { STORAGE_KEY } from './constants'
import { useFinanceStore } from './hooks/useFinanceStore'
import { currentYearMonth } from './lib/format'
import type { FinanceState, Transaction } from './types'

const THEMES: FinanceState['theme'][] = ['system', 'light', 'dark']

export default function App() {
  const [yearMonth, setYearMonth] = useState(currentYearMonth)
  const [search, setSearch] = useState('')

  const store = useFinanceStore(yearMonth, search)

  const cycleTheme = useCallback(() => {
    const i = THEMES.indexOf(store.theme)
    store.setTheme(THEMES[(i + 1) % THEMES.length])
  }, [store])

  const handleExport = useCallback(() => {
    const blob = new Blob(
      [JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), data: store.allTransactions }, null, 2)],
      { type: 'application/json' },
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `thu-chi-${yearMonth}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [store.allTransactions, yearMonth])

  const handleImport = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        const text = await file.text()
        const json = JSON.parse(text) as { data?: Transaction[]; transactions?: Transaction[] }
        const list = json.data ?? json.transactions
        if (!Array.isArray(list)) throw new Error('invalid')
        if (!confirm(`Nhập ${list.length} giao dịch? Dữ liệu hiện tại sẽ bị thay thế.`)) return
        store.importData(list)
      } catch {
        alert('File không hợp lệ.')
      }
    }
    input.click()
  }, [store])

  return (
    <div className="mx-auto min-h-dvh max-w-3xl px-4 pb-28 pt-0 sm:px-6">
      <Header
        yearMonth={yearMonth}
        onMonthChange={setYearMonth}
        search={search}
        onSearchChange={setSearch}
        theme={store.theme}
        onThemeCycle={cycleTheme}
        onExport={handleExport}
        onImport={handleImport}
      />

      <main className="mx-auto max-w-3xl space-y-6 py-6">
        <SummaryCards stats={store.stats} allTimeBalance={store.allTimeBalance} />

        <div className="grid gap-4 sm:grid-cols-2">
          <CategoryBreakdown
            title="Chi theo danh mục"
            type="expense"
            slices={store.expenseBreakdown}
            accent="bg-rose-500"
          />
          <CategoryBreakdown
            title="Thu theo danh mục"
            type="income"
            slices={store.incomeBreakdown}
            accent="bg-emerald-500"
          />
        </div>

        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            Giao dịch ({store.transactions.length})
          </h2>
          <TransactionList
            transactions={store.transactions}
            onUpdate={store.update}
            onRemove={store.remove}
          />
        </section>

        <p className="text-center text-xs text-slate-400">
          Dữ liệu lưu trên thiết bị ({STORAGE_KEY}). Không gửi lên server.
        </p>
      </main>

      <TransactionForm onSubmit={store.add} />
    </div>
  )
}
