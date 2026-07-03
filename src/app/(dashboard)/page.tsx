import { DashboardOverview } from '@/components/features/dashboard/DashboardOverview'
import { TrendChart } from '@/components/features/dashboard/TrendChart'
import { TransactionForm } from '@/components/features/transactions/TransactionForm'
import { TransactionList } from '@/components/features/transactions/TransactionList'
import { MonthFilter } from '@/components/features/dashboard/MonthFilter'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <MonthFilter />
      </div>
      
      <DashboardOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* On mobile: form comes first (order-first), chart+list below */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <TransactionForm />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
          <TrendChart />
          <TransactionList />
        </div>
      </div>
    </div>
  )
}

