import { NextResponse } from 'next/server'
import { TransactionService } from '@/server/services/transaction.service'
import { createTransactionSchema } from '@/lib/validations/transaction'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined
    const type = (searchParams.get('type') as 'INCOME' | 'EXPENSE') || undefined
    
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined

    const transactions = await TransactionService.getTransactions({
      categoryId,
      type,
      startDate,
      endDate
    })
    
    // We need to stringify Decimal values for JSON response, though Next.js 14 handles simple json responses well, 
    // to be completely safe, we can let Next.js serialize it (Next.js 14 json response handles basic object types, but Decimal sometimes throws if not handled)
    // Actually, `NextResponse.json` will call `.toJSON()` on Decimal if it exists, which returns string.
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const validationResult = createTransactionSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.flatten() }, { status: 400 })
    }

    const newTransaction = await TransactionService.createTransaction(validationResult.data)
    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 })
  }
}
