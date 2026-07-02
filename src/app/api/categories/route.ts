import { NextResponse } from 'next/server'
import { CategoryService } from '@/server/services/category.service'
import { createCategorySchema } from '@/lib/validations/category'

export async function GET() {
  try {
    const categories = await CategoryService.getCategories()
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const validationResult = createCategorySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.flatten() }, { status: 400 })
    }

    const newCategory = await CategoryService.createCategory(validationResult.data)
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
