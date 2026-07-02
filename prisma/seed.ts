import { PrismaClient, TransactionType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.transaction.deleteMany()
  await prisma.budget.deleteMany()
  await prisma.category.deleteMany()

  console.log('Cleared existing data')

  // Create Categories
  const food = await prisma.category.create({
    data: { name: 'Food & Dining', color: '#EF4444', icon: 'utensils' }
  })
  const salary = await prisma.category.create({
    data: { name: 'Salary', color: '#10B981', icon: 'wallet' }
  })
  const entertainment = await prisma.category.create({
    data: { name: 'Entertainment', color: '#8B5CF6', icon: 'film' }
  })
  const utilities = await prisma.category.create({
    data: { name: 'Utilities', color: '#3B82F6', icon: 'zap' }
  })

  console.log('Created categories')

  // Create dummy transactions for the last 6 months
  const transactions = []
  const now = new Date()

  for (let i = 0; i < 60; i++) {
    // Random date within the last 6 months
    const date = new Date(now.getTime() - Math.random() * 180 * 24 * 60 * 60 * 1000)
    
    // Income
    if (i % 5 === 0) {
      transactions.push({
        amount: Math.floor(Math.random() * 5000) + 3000,
        type: TransactionType.INCOME,
        categoryId: salary.id,
        date,
        note: 'Monthly Salary'
      })
    } else {
      // Expense
      let categoryId = food.id
      let note = 'Lunch/Dinner'
      let maxAmount = 100
      
      const r = Math.random()
      if (r > 0.5 && r <= 0.8) {
        categoryId = entertainment.id
        note = 'Movies & Games'
        maxAmount = 200
      } else if (r > 0.8) {
        categoryId = utilities.id
        note = 'Monthly Bills'
        maxAmount = 150
      }

      transactions.push({
        amount: Math.floor(Math.random() * maxAmount) + 10,
        type: TransactionType.EXPENSE,
        categoryId,
        date,
        note
      })
    }
  }

  await prisma.transaction.createMany({
    data: transactions
  })

  console.log(`Created ${transactions.length} dummy transactions`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
