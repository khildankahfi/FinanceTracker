'use client'

import { useQuery } from '@tanstack/react-query'
import { useFilterStore } from '@/store/useFilterStore'

async function fetchSummary(startDate: Date, endDate: Date) {
  const params = new URLSearchParams({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  })
  const res = await fetch(`/api/transactions/summary?${params}`)
  if (!res.ok) throw new Error('Failed to fetch summary')
  return res.json()
}

export function DashboardOverview() {
  const { startDate, endDate } = useFilterStore()
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['summary', startDate, endDate],
    queryFn: () => fetchSummary(startDate, endDate),
  })

  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse"><div className="h-32 bg-gray-200 rounded-xl"/><div className="h-32 bg-gray-200 rounded-xl"/><div className="h-32 bg-gray-200 rounded-xl"/></div>
  if (isError) return <div className="text-red-500">Error loading dashboard summary.</div>

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Balance</h3>
        <p className={`text-2xl font-bold ${data?.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
          {formatCurrency(data?.balance || 0)}
        </p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Income</h3>
        <p className="text-2xl font-bold text-emerald-600">
          {formatCurrency(data?.totalIncome || 0)}
        </p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Expense</h3>
        <p className="text-2xl font-bold text-red-600">
          {formatCurrency(data?.totalExpense || 0)}
        </p>
      </div>
    </div>
  )
}
