import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { CATEGORIES, categoryIcon, categoryLabel } from '../constants'
import { formatMoney, formatShortDate } from '../lib/format'
import type { Transaction } from '../types'

interface Props {
  transactions: Transaction[]
  onUpdate: (id: string, patch: Partial<Transaction>) => void
  onRemove: (id: string) => void
}

export function TransactionList({ transactions, onUpdate, onRemove }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)

  if (transactions.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center text-slate-500">
        <p className="text-4xl mb-2">📭</p>
        <p>Chưa có giao dịch trong tháng này.</p>
        <p className="mt-1 text-sm">Nhấn nút + để thêm thu hoặc chi.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {transactions.map((t) => {
        const isIncome = t.type === 'income'
        const editing = editingId === t.id

        return (
          <li key={t.id} className="glass rounded-2xl p-4">
            {editing ? (
              <EditRow
                tx={t}
                onSave={(patch) => {
                  onUpdate(t.id, patch)
                  setEditingId(null)
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl dark:bg-slate-800">
                  {categoryIcon(t.type, t.category)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {t.note || categoryLabel(t.type, t.category)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {categoryLabel(t.type, t.category)} · {formatShortDate(t.date)}
                  </p>
                </div>
                <p
                  className={`shrink-0 font-bold tabular-nums ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}
                >
                  {isIncome ? '+' : '−'}
                  {formatMoney(t.amount)}
                </p>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingId(t.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                    aria-label="Sửa"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Xóa giao dịch này?')) onRemove(t.id)
                    }}
                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50"
                    aria-label="Xóa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function EditRow({
  tx,
  onSave,
  onCancel,
}: {
  tx: Transaction
  onSave: (patch: Partial<Transaction>) => void
  onCancel: () => void
}) {
  const [amount, setAmount] = useState(String(tx.amount))
  const [note, setNote] = useState(tx.note)
  const [date, setDate] = useState(tx.date)
  const [category, setCategory] = useState(tx.category)
  const cats = CATEGORIES[tx.type]

  return (
    <div className="space-y-3">
      <input
        type="text"
        inputMode="numeric"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
      >
        {cats.map((c) => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ghi chú"
        className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border py-2 text-sm dark:border-slate-700"
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={() => {
            const parsed = Number(amount.replace(/\D/g, ''))
            if (parsed > 0) onSave({ amount: parsed, note, date, category })
          }}
          className="flex-1 rounded-lg bg-emerald-600 py-2 text-sm text-white"
        >
          Lưu
        </button>
      </div>
    </div>
  )
}
