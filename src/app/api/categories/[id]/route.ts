import { NextResponse } from 'next/server'
import { CategoryService } from '@/server/services/category.service'
import { updateCategorySchema } from '@/lib/validations/category'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await CategoryService.getCategoryById(id)
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 404 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    
    const validationResult = updateCategorySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.flatten() }, { status: 400 })
    }

    const updatedCategory = await CategoryService.updateCategory(id, validationResult.data)
    return NextResponse.json(updatedCategory)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await CategoryService.deleteCategory(id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
