import { TransactionList } from '@/components/features/transactions/TransactionList'
import { MonthFilter } from '@/components/features/dashboard/MonthFilter'

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Semua Transaksi</h1>
        <MonthFilter />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
        {/* We can re-use TransactionList, but because it's constrained in height inside its own component,
            we might want to either pass a prop or just let it scroll. For now, we'll reuse it as is. */}
        <TransactionList />
      </div>
    </div>
  )
}
