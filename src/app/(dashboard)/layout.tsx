import { Wallet } from 'lucide-react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <Wallet className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-gray-900">FinanceTracker</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-900 hover:text-indigo-600 py-5">Dashboard</Link>
            <Link href="/transactions" className="text-sm font-semibold text-gray-800 hover:text-indigo-700 py-5">Transactions</Link>
            <Link href="/budgets" className="text-sm font-semibold text-gray-800 hover:text-indigo-700 py-5">Budgets</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
    </div>
  )
}
