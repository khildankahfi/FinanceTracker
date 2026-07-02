import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CreateBudgetInput, UpdateBudgetInput } from '@/lib/validations/budget'

type TransactionWithCategory = Prisma.TransactionGetPayload<{ include: { category: true } }>
type BudgetWithCategory = Prisma.BudgetGetPayload<{ include: { category: true } }>

export class BudgetService {
  static async getBudgets(month: number, year: number) {
    try {
      const budgets: BudgetWithCategory[] = await prisma.budget.findMany({
        where: { month, year },
        include: { category: true },
      })

      // We need to calculate how much has been spent for each budgeted category in this month
      // First, get all expenses for this month
      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 0, 23, 59, 59, 999)

      const expenses = await prisma.transaction.findMany({
        where: {
          type: 'EXPENSE',
          date: { gte: startDate, lte: endDate },
        }
      })

      // Calculate spent per category
      const spentPerCategory = expenses.reduce<Record<string, number>>((acc: Record<string, number>, curr) => {
        if (!acc[curr.categoryId]) acc[curr.categoryId] = 0
        acc[curr.categoryId] += Number(curr.amount)
        return acc
      }, {})

      // Map spent amount back to budgets
      return budgets.map((budget: BudgetWithCategory) => ({
        ...budget,
        spent: spentPerCategory[budget.categoryId] || 0
      }))

    } catch (error) {
      console.error('Error fetching budgets:', error)
      throw new Error('Failed to fetch budgets')
    }
  }

  static async setBudget(data: CreateBudgetInput) {
    try {
      // Find or create category by name
      let category = await prisma.category.findFirst({
        where: { name: { equals: data.categoryName, mode: 'insensitive' } }
      })
      
      if (!category) {
        category = await prisma.category.create({
          data: { name: data.categoryName, color: '#4F46E5', icon: 'tag' }
        })
      }

      const { categoryName, ...rest } = data

      // Upsert: update if exists, otherwise create
      return await prisma.budget.upsert({
        where: {
          categoryId_month_year: {
            categoryId: category.id,
            month: data.month,
            year: data.year,
          }
        },
        update: {
          monthlyLimit: data.monthlyLimit,
        },
        create: {
          ...rest,
          categoryId: category.id
        }
      })
    } catch (error) {
      console.error('Error setting budget:', error)
      throw new Error('Failed to set budget')
    }
  }

  static async deleteBudget(id: string) {
    try {
      return await prisma.budget.delete({
        where: { id },
      })
    } catch (error) {
      console.error('Error deleting budget:', error)
      throw new Error('Failed to delete budget')
    }
  }
}
