import IPizzaIngredient from "../interfaces/PizzaIngredient";
import prisma from "../lib/db";

type TPizzaIngredientResponse = {
    id: number,
    id_pizza: number,
    ingredient_id: number,
    ingredient: { id: number, name: string, price: number }
}

class PizzaIngredient {
    async create(pizzaIngredient: Omit<IPizzaIngredient, 'id'>): Promise<IPizzaIngredient | false> {
        try {
            const result = await prisma.pizzaIngredient.create({
                data: pizzaIngredient
            })

            return result
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async delete(id_pizza: number, ingredient_id: number): Promise<boolean> {
        try {
            const result = await prisma.pizzaIngredient.deleteMany({
                where: {
                    id_pizza,
                    ingredient_id
                }
            })

            return true
        } catch (error) {
            return false
        }
    }

    async getAll(id_pizza: number): Promise<TPizzaIngredientResponse[] | false> {
        const result = await prisma.pizzaIngredient.findMany({
            where: {
                id_pizza
            },
            include: {
                ingredient: true
            }
        })

        return result.length > 0 ? result : false
    }

    async find(id_pizza: number, ingredient_id: number): Promise<IPizzaIngredient | false> {
        const result = await prisma.pizzaIngredient.findFirst({
            where: {
                id_pizza,
                ingredient_id
            }
        })

        return result ? result : false
    }
}

export default new PizzaIngredient()