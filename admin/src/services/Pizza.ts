import IPizza from "../interfaces/Pizza";
import prisma from "../lib/db";

class Pizza {
    async newPizza(pizza: Omit<IPizza, "id">): Promise<IPizza | false> {
        try {
            const data = pizza.size
            const result = await prisma.pizza.create({
                data: {
                    description: pizza.description,
                    name: pizza.name,
                    ingredient: {
                        createMany: {
                            data: pizza.ingredient
                        }
                    },
                    pizza_size: {
                        createMany: {
                            data
                        }
                    }
                },
                include: {
                    ingredient: {
                        include: {
                            ingrediente: true
                        }
                    },
                    pizza_size: {
                        include: {
                            size: true
                        }
                    }
                }
            })

            const response: IPizza = {
                id: result.id,
                description: result.description,
                name: result.name,
                ingredient: result.ingredient.map(item => { return { ingredient_id: item.ingredient_id, name: item.ingrediente.name } }),
                size: result.pizza_size.map((item) => { return { size_id: item.size_id, price: item.price, name: item.size.name } })
            }

            return response
        } catch (error) {
            return false
        }
    }
}

export default new Pizza()