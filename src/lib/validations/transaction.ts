import { z } from 'zod'

export const createTransactionSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['INCOME', 'EXPENSE']),
  date: z.string().or(z.date()).transform((val) => new Date(val)),
  note: z.string().optional(),
  categoryName: z.string().min(1, 'Category is required'),
})

export const updateTransactionSchema = createTransactionSchema.partial()

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>
