import { ChevronLeft, ChevronRight, Download, Moon, Search, Sun, Upload } from 'lucide-react'
import { formatMonthLabel } from '../lib/format'
import type { FinanceState } from '../types'

interface Props {
  yearMonth: string
  onMonthChange: (ym: string) => void
  search: string
  onSearchChange: (v: string) => void
  theme: FinanceState['theme']
  onThemeCycle: () => void
  onExport: () => void
  onImport: () => void
}

function shiftMonth(ym: string, delta: number): string {
  const [y, m] = ym.split('-').map(Number)
  const d = new Date(y, m - 1 + delta, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function Header({
  yearMonth,
  onMonthChange,
  search,
  onSearchChange,
  theme,
  onThemeCycle,
  onExport,
  onImport,
}: Props) {
  const ThemeIcon = theme === 'dark' ? Moon : Sun

  return (
    <header className="sticky top-0 z-10 -mx-4 border-b border-slate-200/80 bg-slate-50/90 px-4 py-4 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/90 sm:-mx-6 sm:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
              Thu Chi
            </h1>
            <p className="text-xs text-slate-500">Quản lý tài chính cá nhân</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onImport}
              className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-200/80 dark:hover:bg-slate-800"
              title="Nhập dữ liệu"
            >
              <Upload className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onExport}
              className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-200/80 dark:hover:bg-slate-800"
              title="Xuất dữ liệu"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onThemeCycle}
              className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-200/80 dark:hover:bg-slate-800"
              title="Đổi giao diện"
            >
              <ThemeIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-white px-2 py-1 shadow-sm dark:bg-slate-900">
          <button
            type="button"
            onClick={() => onMonthChange(shiftMonth(yearMonth, -1))}
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Tháng trước"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold capitalize">{formatMonthLabel(yearMonth)}</span>
          <button
            type="button"
            onClick={() => onMonthChange(shiftMonth(yearMonth, 1))}
            className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Tháng sau"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Tìm giao dịch..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-emerald-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>
    </header>
  )
}
