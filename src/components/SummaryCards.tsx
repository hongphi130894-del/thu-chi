import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react'
import { formatMoney } from '../lib/format'
import type { MonthStats } from '../lib/stats'

interface Props {
  stats: MonthStats
  allTimeBalance: number
}

export function SummaryCards({ stats, allTimeBalance }: Props) {
  const cards = [
    {
      label: 'Thu nhập tháng',
      value: stats.income,
      icon: ArrowUpRight,
      className: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Chi tiêu tháng',
      value: stats.expense,
      icon: ArrowDownLeft,
      className: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-500/10',
    },
    {
      label: 'Còn lại tháng',
      value: stats.balance,
      icon: Wallet,
      className: stats.balance >= 0 ? 'text-sky-600 dark:text-sky-400' : 'text-amber-600',
      bg: 'bg-sky-500/10',
    },
  ]

  return (
    <section className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, className, bg }) => (
          <article key={label} className="glass rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
                <p className={`mt-1 text-xl font-bold tabular-nums ${className}`}>
                  {formatMoney(value)}
                </p>
              </div>
              <span className={`rounded-xl p-2 ${bg}`}>
                <Icon className={`h-5 w-5 ${className}`} />
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Tổng số dư tích lũy:{' '}
        <span
          className={`font-semibold tabular-nums ${allTimeBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
        >
          {formatMoney(allTimeBalance)}
        </span>
      </p>
    </section>
  )
}
