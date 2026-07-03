'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

import { useFilterStore } from '@/store/useFilterStore'

export function TransactionList() {
  const { startDate, endDate } = useFilterStore()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions', startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
      const res = await fetch(`/api/transactions?${params}`)
      if (!res.ok) throw new Error('Failed to fetch transactions')
      const json = await res.json()
      // Guard: ensure we always return an array
      return Array.isArray(json) ? json : []
    }
  })

  const transactions = Array.isArray(data) ? data : []

  if (isLoading) return <div className="animate-pulse bg-gray-100 h-64 rounded-xl mt-6"></div>

  if (isError) return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-red-100 p-6 text-center text-red-500">
      Gagal memuat transaksi. Pastikan koneksi database aktif.
    </div>
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Riwayat Transaksi</h3>
      </div>
      <ul className="divide-y divide-gray-100 max-h-[400px] sm:max-h-[500px] overflow-y-auto">
        {transactions.slice(0, 10).map((t: any) => (
          <li key={t.id} className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: t.category?.color || '#4F46E5' }}>
                {t.category?.name?.charAt(0) ?? '?'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{t.note || t.category?.name}</p>
                <p className="text-xs font-medium text-gray-500">{format(new Date(t.date), 'dd MMM yyyy', { locale: id })}</p>
              </div>
            </div>
            <div className={`text-sm font-semibold flex-shrink-0 ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-gray-900'}`}>
              {t.type === 'INCOME' ? '+' : '-'}{formatCurrency(Number(t.amount))}
            </div>
          </li>
        ))}
        {transactions.length === 0 && (
          <li className="p-6 text-center text-gray-500 text-sm">Belum ada transaksi untuk bulan ini.</li>
        )}
      </ul>
    </div>
  )
}
