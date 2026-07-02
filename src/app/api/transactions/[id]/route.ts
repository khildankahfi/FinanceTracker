import { NextResponse } from 'next/server'
import { TransactionService } from '@/server/services/transaction.service'
import { updateTransactionSchema } from '@/lib/validations/transaction'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const transaction = await TransactionService.getTransactionById(id)
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 404 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    
    const validationResult = updateTransactionSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.flatten() }, { status: 400 })
    }

    const updatedTransaction = await TransactionService.updateTransaction(id, validationResult.data)
    return NextResponse.json(updatedTransaction)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await TransactionService.deleteTransaction(id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 })
  }
}
