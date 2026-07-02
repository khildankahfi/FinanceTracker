import { NextResponse } from 'next/server'
import { BudgetService } from '@/server/services/budget.service'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await BudgetService.deleteBudget(id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete budget' }, { status: 500 })
  }
}
