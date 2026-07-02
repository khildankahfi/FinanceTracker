import { NextResponse } from 'next/server'
import { BudgetService } from '@/server/services/budget.service'
import { createBudgetSchema } from '@/lib/validations/budget'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1))
    const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()))

    const budgets = await BudgetService.getBudgets(month, year)
    return NextResponse.json(budgets)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const validationResult = createBudgetSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.flatten() }, { status: 400 })
    }

    const budget = await BudgetService.setBudget(validationResult.data)
    return NextResponse.json(budget, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set budget' }, { status: 500 })
  }
}
