import ICategory from "../interfaces/Category"
import prisma from "../lib/db"

class Category {
    async newCategory(category: Omit<ICategory, 'id'>): Promise<ICategory | false> {
        try {
            const result = await prisma.catergory.create({
                data: category
            })

            return result
        } catch (error) {
            return false
        }
    }

    async updateCategory(category: Omit<ICategory, 'id'>, id: number): Promise<ICategory | false> {
        try {
            const result = await prisma.catergory.update({
                where: {
                    id
                },
                data: category
            })

            return result
        } catch (error) {
            return false
        }
    }

    async getAll(): Promise<ICategory[] | false> {
        const result = await prisma.catergory.findMany()

        return result.length > 0 ? result : false
    }

    async getById(id: number) {
        const result = await prisma.catergory.findUnique({
            where: {
                id
            }
        })

        return result ? result : false
    }

    async getPizza(category_id: number) {
        const result = await prisma.pizza.findMany({
            where: {
                category_id
            }
        })

        return result.length > 0 ? result : false
    }
}

export default new Category()