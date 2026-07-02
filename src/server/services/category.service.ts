import prisma from '@/lib/prisma'
import { CreateCategoryInput, UpdateCategoryInput } from '@/lib/validations/category'

export class CategoryService {
  static async getCategories() {
    try {
      return await prisma.category.findMany({
        orderBy: { name: 'asc' },
      })
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Failed to fetch categories')
    }
  }

  static async getCategoryById(id: string) {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
      })
      if (!category) throw new Error('Category not found')
      return category
    } catch (error) {
      console.error('Error fetching category:', error)
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch category')
    }
  }

  static async createCategory(data: CreateCategoryInput) {
    try {
      return await prisma.category.create({
        data,
      })
    } catch (error) {
      console.error('Error creating category:', error)
      throw new Error('Failed to create category')
    }
  }

  static async updateCategory(id: string, data: UpdateCategoryInput) {
    try {
      return await prisma.category.update({
        where: { id },
        data,
      })
    } catch (error) {
      console.error('Error updating category:', error)
      throw new Error('Failed to update category')
    }
  }

  static async deleteCategory(id: string) {
    try {
      return await prisma.category.delete({
        where: { id },
      })
    } catch (error) {
      console.error('Error deleting category:', error)
      throw new Error('Failed to delete category')
    }
  }
}
