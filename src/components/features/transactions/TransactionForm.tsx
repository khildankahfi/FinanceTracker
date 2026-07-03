'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTransactionSchema, CreateTransactionInput } from '@/lib/validations/transaction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { z } from 'zod'

type FormInput = z.input<typeof createTransactionSchema>

const inputClass = "mt-1 block w-full rounded-lg border-2 border-gray-400 bg-white text-gray-900 font-medium shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 text-sm px-3 py-2 placeholder:text-gray-500"
const labelClass = "block text-sm font-semibold text-gray-900"

export function TransactionForm({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: 'EXPENSE',
      date: new Date().toISOString().split('T')[0] as unknown as Date,
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: CreateTransactionInput) => {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create transaction')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summary'] })
      queryClient.invalidateQueries({ queryKey: ['trendChart'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      reset()
      onSuccess?.()
    },
    onError: (err) => {
      setError(err.message)
    }
  })

  const onSubmit = (data: FormInput) => {
    mutation.mutate(data as CreateTransactionInput)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Catat Transaksi</h3>
      
      {error && <div className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded-lg">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tipe</label>
          <select {...register('type')} className={inputClass}>
            <option value="EXPENSE">Pengeluaran</option>
            <option value="INCOME">Pemasukan</option>
          </select>
          {errors.type && <p className="text-red-600 text-xs mt-1 font-medium">{errors.type.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Tanggal</label>
          <input type="date" {...register('date')} className={inputClass} />
          {errors.date && <p className="text-red-600 text-xs mt-1 font-medium">{errors.date.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Kategori</label>
        <input
          type="text"
          {...register('categoryName')}
          className={inputClass}
          placeholder="Contoh: Makan, Transport, Belanja..."
        />
        {errors.categoryName && <p className="text-red-600 text-xs mt-1 font-medium">{errors.categoryName.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Jumlah (Rp)</label>
        <input
          type="number"
          step="1000"
          {...register('amount', { valueAsNumber: true })}
          className={inputClass}
          placeholder="Contoh: 50000"
        />
        {errors.amount && <p className="text-red-600 text-xs mt-1 font-medium">{errors.amount.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Catatan <span className="text-gray-500 font-normal">(Opsional)</span></label>
        <input
          type="text"
          {...register('note')}
          className={inputClass}
          placeholder="Contoh: Makan siang bersama teman"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || mutation.isPending}
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
      >
        {isSubmitting || mutation.isPending ? 'Menyimpan...' : 'Simpan Transaksi'}
      </button>
    </form>
  )
}
