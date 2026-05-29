const vnd = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

export function formatMoney(amount: number): string {
  return vnd.format(amount)
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}

export function formatMonthLabel(yearMonth: string): string {
  const [y, m] = yearMonth.split('-').map(Number)
  const d = new Date(y, m - 1, 1)
  return d.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })
}

export function todayISO(): string {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

export function currentYearMonth(): string {
  return todayISO().slice(0, 7)
}
