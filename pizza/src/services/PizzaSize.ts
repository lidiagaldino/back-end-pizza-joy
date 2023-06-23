import IPizzaSize from "../interfaces/PizzaSize"
import prisma from "../lib/db"

type TPizzaSizeReturn = {
    id: number,
    pizza_id: number,
    size_id: number,
    price: number,
    size: { id: number, name: string }
}

class PizzaSize {
    async create(pizzaSize: Omit<IPizzaSize, 'id'>): Promise<IPizzaSize | false> {

        try {
            const response = await prisma.pizzaSize.create({
                data: pizzaSize
            })

            return response
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async delete(pizza_id: number, size_id: number): Promise<boolean> {
        try {
            const response = await prisma.pizzaSize.deleteMany({
                where: {
                    pizza_id,
                    size_id
                }
            })

            return true
        } catch (error) {
            return false
        }
    }

    async getAll(pizza_id: number): Promise<TPizzaSizeReturn[] | false> {
        const pizza = await prisma.pizzaSize.findMany({
            where: {
                pizza_id
            },
            include: {
                size: true
            }
        })

        return pizza.length > 0 ? pizza : false
    }
}

export default new PizzaSize()