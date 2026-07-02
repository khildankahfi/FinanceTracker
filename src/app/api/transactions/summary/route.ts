import { NextResponse } from 'next/server'
import { TransactionService } from '@/server/services/transaction.service'
import { startOfMonth, endOfMonth } from 'date-fns'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    
    // Default to current month if no dates provided
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')
    
    const startDate = startDateParam ? new Date(startDateParam) : startOfMonth(new Date())
    const endDate = endDateParam ? new Date(endDateParam) : endOfMonth(new Date())

    const summary = await TransactionService.getDashboardSummary(startDate, endDate)
    
    return NextResponse.json(summary)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction summary' }, { status: 500 })
  }
}
