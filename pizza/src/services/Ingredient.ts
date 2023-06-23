import IIngredient from "../interfaces/Ingredient";
import prisma from "../lib/db";

class Ingredient {
    async create(ingredient: Omit<IIngredient, 'id'>): Promise<IIngredient | false> {
        try {
            const result = await prisma.ingredient.create({
                data: ingredient
            })

            return result
        } catch (error) {
            return false
        }
    }

    async update(ingredient: Omit<IIngredient, 'id'>, id: number): Promise<IIngredient | false> {
        try {
            const result = await prisma.ingredient.update({
                where: {
                    id
                },
                data: ingredient
            })
            return result
        } catch (error) {
            return false
        }
    }

    async getAll(): Promise<IIngredient[] | false> {
        const result = await prisma.ingredient.findMany()

        return result.length > 0 ? result : false
    }

    async getById(id: number): Promise<IIngredient | false> {
        const result = await prisma.ingredient.findUnique({
            where: {
                id
            }
        })

        console.log(result);

        return result ? result : false
    }

    async delete(id: number): Promise<boolean> {
        try {
            await prisma.ingredient.delete({
                where: {
                    id
                }
            })

            return true
        } catch (error) {
            return false
        }
    }
}
export default new Ingredient()