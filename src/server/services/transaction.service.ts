import prisma from '@/lib/prisma'
import { CreateTransactionInput, UpdateTransactionInput } from '@/lib/validations/transaction'

export class TransactionService {
  static async getTransactions(params?: { categoryId?: string, type?: 'INCOME' | 'EXPENSE', startDate?: Date, endDate?: Date }) {
    try {
      const where: any = {}
      if (params?.categoryId) where.categoryId = params.categoryId
      if (params?.type) where.type = params.type
      if (params?.startDate || params?.endDate) {
        where.date = {}
        if (params.startDate) where.date.gte = params.startDate
        if (params.endDate) where.date.lte = params.endDate
      }

      return await prisma.transaction.findMany({
        where,
        include: { category: true },
        orderBy: { date: 'desc' },
      })
    } catch (error) {
      console.error('Error fetching transactions:', error)
      throw new Error('Failed to fetch transactions')
    }
  }

  static async getTransactionById(id: string) {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: { id },
        include: { category: true },
      })
      if (!transaction) throw new Error('Transaction not found')
      return transaction
    } catch (error) {
      console.error('Error fetching transaction:', error)
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch transaction')
    }
  }

  static async createTransaction(data: CreateTransactionInput) {
    try {
      // Find or create category by name
      let category = await prisma.category.findFirst({
        where: { name: { equals: data.categoryName, mode: 'insensitive' } }
      })
      
      if (!category) {
        category = await prisma.category.create({
          data: { name: data.categoryName, color: '#4F46E5', icon: 'tag' } // default color
        })
      }

      const { categoryName, ...rest } = data

      return await prisma.transaction.create({
        data: {
          ...rest,
          categoryId: category.id
        },
        include: {
          category: true,
        },
      })
    } catch (error) {
      console.error('Error creating transaction:', error)
      throw new Error('Failed to create transaction')
    }
  }

  static async updateTransaction(id: string, data: UpdateTransactionInput) {
    try {
      return await prisma.transaction.update({
        where: { id },
        data,
      })
    } catch (error) {
      console.error('Error updating transaction:', error)
      throw new Error('Failed to update transaction')
    }
  }

  static async deleteTransaction(id: string) {
    try {
      return await prisma.transaction.delete({
        where: { id },
      })
    } catch (error) {
      console.error('Error deleting transaction:', error)
      throw new Error('Failed to delete transaction')
    }
  }

  static async getDashboardSummary(startDate: Date, endDate: Date) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          }
        },
      })

      // We calculate in JS because Prisma Decimal doesn't aggregate smoothly across all DBs without raw SQL
      let totalIncome = 0
      let totalExpense = 0

      transactions.forEach(t => {
        const amount = Number(t.amount)
        if (t.type === 'INCOME') totalIncome += amount
        if (t.type === 'EXPENSE') totalExpense += amount
      })

      return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      }
    } catch (error) {
      console.error('Error fetching dashboard summary:', error)
      throw new Error('Failed to fetch dashboard summary')
    }
  }
}
