import { Plus } from 'lucide-react'
import { useState } from 'react'
import { CATEGORIES } from '../constants'
import { todayISO } from '../lib/format'
import type { Transaction, TxType } from '../types'

interface Props {
  onSubmit: (tx: Omit<Transaction, 'id'>) => void
}

export function TransactionForm({ onSubmit }: Props) {
  const [type, setType] = useState<TxType>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES.expense[0].id)
  const [note, setNote] = useState('')
  const [date, setDate] = useState(todayISO())
  const [open, setOpen] = useState(false)

  const categories = CATEGORIES[type]

  function switchType(next: TxType) {
    setType(next)
    setCategory(CATEGORIES[next][0].id)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = Number(amount.replace(/\D/g, ''))
    if (!parsed || parsed <= 0) return
    onSubmit({ type, amount: parsed, category, note: note.trim(), date })
    setAmount('')
    setNote('')
    setDate(todayISO())
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition hover:scale-105 hover:bg-emerald-500 active:scale-95 sm:bottom-8 sm:right-8"
        aria-label="Thêm giao dịch"
      >
        <Plus className="h-7 w-7" />
      </button>
    )
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <form
        className="glass w-full max-w-md rounded-2xl p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-lg font-bold">Giao dịch mới</h2>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {(['expense', 'income'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => switchType(t)}
              className={`rounded-lg py-2 text-sm font-medium transition ${
                type === t
                  ? t === 'income'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-rose-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {t === 'income' ? 'Thu' : 'Chi'}
            </button>
          ))}
        </div>

        <label className="mb-3 block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Số tiền (VND)</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="500000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-semibold tabular-nums outline-none ring-emerald-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
            autoFocus
            required
          />
        </label>

        <label className="mb-3 block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Danh mục</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  category === c.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </label>

        <label className="mb-3 block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Ghi chú</span>
          <input
            type="text"
            placeholder="Ví dụ: Cơm trưa"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none ring-emerald-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-xs font-medium text-slate-500">Ngày</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900"
            required
          />
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium dark:border-slate-700"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  )
}
