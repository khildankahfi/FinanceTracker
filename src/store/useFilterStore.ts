import { create } from 'zustand'
import { startOfMonth, endOfMonth } from 'date-fns'

interface FilterState {
  startDate: Date
  endDate: Date
  categoryId?: string
  type?: 'INCOME' | 'EXPENSE'
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  setCategoryId: (id?: string) => void
  setType: (type?: 'INCOME' | 'EXPENSE') => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  startDate: startOfMonth(new Date()),
  endDate: endOfMonth(new Date()),
  categoryId: undefined,
  type: undefined,
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setType: (type) => set({ type }),
  resetFilters: () => set({
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
    categoryId: undefined,
    type: undefined,
  })
}))
