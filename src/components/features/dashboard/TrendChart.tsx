'use client'

import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { startOfMonth, subMonths, endOfMonth, format } from 'date-fns'

async function fetchTrendData() {
  const endDate = endOfMonth(new Date())
  const startDate = startOfMonth(subMonths(new Date(), 5)) // 6 months total

  const params = new URLSearchParams({
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  })
  const res = await fetch(`/api/transactions?${params}`)
  if (!res.ok) throw new Error('Failed to fetch trend data')
  const transactions = await res.json()

  // Aggregate by month
  const aggregated = transactions.reduce((acc: any, curr: any) => {
    const month = format(new Date(curr.date), 'MMM yyyy')
    if (!acc[month]) acc[month] = { name: month, income: 0, expense: 0 }
    
    const amount = Number(curr.amount)
    if (curr.type === 'INCOME') acc[month].income += amount
    if (curr.type === 'EXPENSE') acc[month].expense += amount
    return acc
  }, {})

  return Object.values(aggregated).reverse() // Since transactions come ordered by desc, reverse for chronological
}

export function TrendChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trendChart'],
    queryFn: fetchTrendData,
  })

  if (isLoading) return <div className="h-64 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">Loading chart...</div>
  if (isError) return <div className="text-red-500">Error loading chart.</div>

  return (
    <div className="h-80 p-6 bg-white rounded-xl shadow-sm border border-gray-100 w-full mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">6-Month Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data as any[]}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#6B7280', fontSize: 12}}
              tickFormatter={(value) => `${value / 1000}k`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} activeDot={{ r: 6 }} name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: '#EF4444' }} activeDot={{ r: 6 }} name="Expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
