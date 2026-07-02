import { z } from 'zod'

export const createBudgetSchema = z.object({
  monthlyLimit: z.number().positive('Limit must be positive'),
  month: z.number().min(1).max(12),
  year: z.number().min(2000),
  categoryName: z.string().min(1, 'Category is required'),
})

export const updateBudgetSchema = createBudgetSchema.partial()

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>
