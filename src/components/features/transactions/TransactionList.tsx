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
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Riwayat Transaksi Terakhir</h3>
      </div>
      <ul className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
        {transactions.slice(0, 10).map((t: any) => (
          <li key={t.id} className="p-6 hover:bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: t.category?.color || '#4F46E5' }}>
                {t.category?.name?.charAt(0) ?? '?'}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{t.note || t.category?.name}</p>
                <p className="text-xs font-medium text-gray-700">{format(new Date(t.date), 'dd MMM yyyy', { locale: id })}</p>
              </div>
            </div>
            <div className={`font-semibold ${t.type === 'INCOME' ? 'text-emerald-600' : 'text-gray-900'}`}>
              {t.type === 'INCOME' ? '+' : '-'}{formatCurrency(Number(t.amount))}
            </div>
          </li>
        ))}
        {transactions.length === 0 && (
          <li className="p-6 text-center text-gray-500">Belum ada transaksi untuk bulan ini.</li>
        )}
      </ul>
    </div>
  )
}
