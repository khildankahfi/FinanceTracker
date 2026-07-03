import { TransactionList } from '@/components/features/transactions/TransactionList'
import { MonthFilter } from '@/components/features/dashboard/MonthFilter'

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Semua Transaksi</h1>
        <MonthFilter />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <TransactionList />
      </div>
    </div>
  )
}

