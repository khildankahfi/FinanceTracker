'use client'

import { useFilterStore } from '@/store/useFilterStore'
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'
import { id } from 'date-fns/locale'

export function MonthFilter() {
  const { startDate, setStartDate, setEndDate } = useFilterStore()

  // Generate last 12 months for the dropdown
  const months = Array.from({ length: 12 }).map((_, i) => {
    const d = subMonths(new Date(), i)
    return {
      label: format(d, 'MMMM yyyy', { locale: id }),
      value: startOfMonth(d).toISOString(),
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStart = new Date(e.target.value)
    setStartDate(selectedStart)
    setEndDate(endOfMonth(selectedStart))
  }

  return (
    <select 
      value={startDate.toISOString()} 
      onChange={handleChange}
      className="block w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border bg-white text-gray-900 font-medium"
    >
      {months.map((m) => (
        <option key={m.value} value={m.value}>
          {m.label}
        </option>
      ))}
    </select>
  )
}
