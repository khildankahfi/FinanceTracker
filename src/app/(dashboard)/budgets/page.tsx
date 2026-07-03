'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { MonthFilter } from '@/components/features/dashboard/MonthFilter'
import { useFilterStore } from '@/store/useFilterStore'

export default function BudgetsPage() {
  const queryClient = useQueryClient()
  const { startDate } = useFilterStore()
  const month = startDate.getMonth() + 1
  const year = startDate.getFullYear()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [limit, setLimit] = useState('')

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories')
      return res.json()
    }
  })

  const { data: budgets, isLoading } = useQuery({
    queryKey: ['budgets', month, year],
    queryFn: async () => {
      const res = await fetch(`/api/budgets?month=${month}&year=${year}`)
      return res.json()
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: { categoryName: string, monthlyLimit: number, month: number, year: number }) => {
      const res = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to save budget')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
      setSelectedCategory('')
      setLimit('')
    }
  })

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory || !limit) return
    mutation.mutate({
      categoryName: selectedCategory,
      monthlyLimit: Number(limit),
      month,
      year
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Anggaran Bulanan</h1>
        <MonthFilter />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Form — first on mobile, last on desktop */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <form onSubmit={handleSaveBudget} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Set Anggaran</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900">Kategori</label>
              <input 
                type="text" 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full rounded-lg border-2 border-gray-400 bg-white text-gray-900 font-medium shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 text-sm px-3 py-2 placeholder:text-gray-500"
                placeholder="Contoh: Makan, Transport, Belanja..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900">Limit Bulanan (Rp)</label>
              <input 
                type="number" 
                value={limit} 
                onChange={e => setLimit(e.target.value)}
                className="mt-1 block w-full rounded-lg border-2 border-gray-400 bg-white text-gray-900 font-medium shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 text-sm px-3 py-2 placeholder:text-gray-500" 
                placeholder="Contoh: 1000000" 
                required
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              {mutation.isPending ? 'Menyimpan...' : 'Simpan Anggaran'}
            </button>
          </form>
        </div>

        {/* Budget status — takes most space on desktop */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Status Anggaran</h3>
            {isLoading ? (
              <div className="animate-pulse h-32 bg-gray-100 rounded-xl"></div>
            ) : budgets?.length === 0 ? (
              <p className="text-gray-500 text-sm">Belum ada anggaran untuk bulan ini.</p>
            ) : (
              <div className="space-y-5">
                {budgets?.map((b: any) => {
                  const limitNum = Number(b.monthlyLimit)
                  const percentage = Math.min((b.spent / limitNum) * 100, 100)
                  const isOverBudget = b.spent > limitNum

                  return (
                    <div key={b.id}>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <span className="font-medium text-gray-900 text-sm sm:text-base">{b.category.name}</span>
                          <p className="text-xs font-medium text-gray-500 mt-0.5">{formatCurrency(b.spent)} dari {formatCurrency(limitNum)}</p>
                        </div>
                        <span className={`text-sm font-semibold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full transition-all ${isOverBudget ? 'bg-red-600' : percentage > 80 ? 'bg-yellow-400' : 'bg-emerald-500'}`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
