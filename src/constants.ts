import type { TxType } from './types'

export const STORAGE_KEY = 'thu-chi-v1'

export const CATEGORIES: Record<TxType, { id: string; label: string; icon: string }[]> = {
  income: [
    { id: 'salary', label: 'Lương', icon: '💼' },
    { id: 'bonus', label: 'Thưởng', icon: '🎁' },
    { id: 'invest', label: 'Đầu tư', icon: '📈' },
    { id: 'gift-in', label: 'Được tặng', icon: '🎀' },
    { id: 'other-in', label: 'Khác', icon: '✨' },
  ],
  expense: [
    { id: 'food', label: 'Ăn uống', icon: '🍜' },
    { id: 'transport', label: 'Di chuyển', icon: '🚌' },
    { id: 'shopping', label: 'Mua sắm', icon: '🛍️' },
    { id: 'bills', label: 'Hóa đơn', icon: '📄' },
    { id: 'health', label: 'Sức khỏe', icon: '💊' },
    { id: 'entertain', label: 'Giải trí', icon: '🎬' },
    { id: 'education', label: 'Học tập', icon: '📚' },
    { id: 'family', label: 'Gia đình', icon: '👨‍👩‍👧' },
    { id: 'other-out', label: 'Khác', icon: '📦' },
  ],
}

export function categoryLabel(type: TxType, id: string): string {
  const found = CATEGORIES[type].find((c) => c.id === id)
  return found?.label ?? id
}

export function categoryIcon(type: TxType, id: string): string {
  const found = CATEGORIES[type].find((c) => c.id === id)
  return found?.icon ?? '•'
}
