import { Wallet, LayoutDashboard, ArrowLeftRight, PiggyBank } from 'lucide-react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Desktop header — hidden on mobile */}
      <header className="hidden sm:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <Wallet className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-gray-900">FinanceTracker</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-900 hover:text-indigo-600 py-5">Dashboard</Link>
            <Link href="/transactions" className="text-sm font-semibold text-gray-800 hover:text-indigo-700 py-5">Transaksi</Link>
            <Link href="/budgets" className="text-sm font-semibold text-gray-800 hover:text-indigo-700 py-5">Anggaran</Link>
          </nav>
        </div>
      </header>

      {/* Mobile top bar — shown only on mobile */}
      <header className="sm:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 h-14 flex items-center gap-2 text-indigo-600">
          <Wallet className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight text-gray-900">FinanceTracker</span>
        </div>
      </header>

      {/* Main content — extra bottom padding on mobile for bottom nav */}
      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 w-full pb-24 sm:pb-8">
        {children}
      </main>

      {/* Mobile bottom navigation bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-3 h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs font-semibold">Dashboard</span>
          </Link>
          <Link
            href="/transactions"
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeftRight className="h-5 w-5" />
            <span className="text-xs font-semibold">Transaksi</span>
          </Link>
          <Link
            href="/budgets"
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <PiggyBank className="h-5 w-5" />
            <span className="text-xs font-semibold">Anggaran</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
