import IPizza from "../interfaces/Pizza";
import prisma from "../infra/db/prisma";

class Pizza {
    async getPizzas(): Promise<IPizza[] | false> {
        const pizzas = await prisma.pizza.findMany({
            include: {
                ingredient: {
                    select: {
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

        if (pizzas.length > 0) {
            const response: IPizza[] = pizzas.map(item => {
                return {
                    id: item.id,
                    description: item.description,
                    name: item.name,
                    ingredient: item.ingredient.map(ing => { return { ingredient_id: ing.ingrediente.id, name: ing.ingrediente.name } }),
                    size: item.pizza_size.map(siz => { return { size_id: siz.size_id, name: siz.size.name, price: siz.price } })
                }
            })

            return response
        }



        return false
    }

    async getPizzaById(id: number): Promise<IPizza | false> {
        const pizza = await prisma.pizza.findUnique({
            where: {
                id
            },
            include: {
                ingredient: {
                    select: {
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

        if (pizza) {
            const response: IPizza = {
                id: pizza.id,
                description: pizza.description,
                name: pizza.name,
                ingredient: pizza.ingredient.map(ing => { return { ingredient_id: ing.ingrediente.id, name: ing.ingrediente.name } }),
                size: pizza.pizza_size.map(siz => { return { size_id: siz.size_id, name: siz.size.name, price: siz.price } })
            }

            return response
        }

        return false
    }
}

export default new Pizza()