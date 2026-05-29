import { categoryIcon, categoryLabel } from '../constants'
import { formatMoney } from '../lib/format'
import type { CategorySlice } from '../lib/stats'
import type { TxType } from '../types'

interface Props {
  title: string
  type: TxType
  slices: CategorySlice[]
  accent: string
}

export function CategoryBreakdown({ title, type, slices, accent }: Props) {
  if (slices.length === 0) return null

  return (
    <section className="glass rounded-2xl p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
      <ul className="space-y-3">
        {slices.map(({ category, amount, percent }) => (
          <li key={category}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span>{categoryIcon(type, category)}</span>
                <span>{categoryLabel(type, category)}</span>
              </span>
              <span className="tabular-nums text-slate-600 dark:text-slate-300">
                {formatMoney(amount)}{' '}
                <span className="text-xs text-slate-400">({percent}%)</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all ${accent}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
