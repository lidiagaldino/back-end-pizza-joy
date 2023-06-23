import IPizza from "../interfaces/Pizza";
import KafkaSendMessage from "../kafka/KafkaSendMessage";
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
            console.log(error);
            return false
        }
    }

    async updatePizza(pizza: Omit<IPizza, "id" | "ingredient" | "size">, id: number): Promise<Omit<IPizza, "ingredient" | "size"> | false> {
        try {
            const result = await prisma.pizza.update({
                where: {
                    id
                },
                data: {
                    description: pizza.description,
                    name: pizza.name,
                }
            })

            return result
        } catch (error) {
            return false
        }
    }

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

    async addOrRemovePizzaIngredient(ingredient_id: number, id_pizza: number) {
        const verify = await prisma.pizzaIngredient.findFirst({
            where: {
                ingredient_id,
                id_pizza
            }
        })

        let response

        if (verify) {
            response = await prisma.pizzaIngredient.delete({
                where: {
                    id: verify.id
                }
            })
        } else {
            response = await prisma.pizzaIngredient.create({
                data: {
                    id_pizza,
                    ingredient_id
                }
            })
        }

        return response
    }

    async addOrRemovePizzaSize(size_id: number, pizza_id: number, price: number) {
        const verify = await prisma.pizzaSize.findFirst({
            where: {
                size_id,
                pizza_id
            }
        })

        let response

        if (verify) {
            response = await prisma.pizzaSize.delete({
                where: {
                    id: verify.id
                }
            })
        } else {
            response = await prisma.pizzaSize.create({
                data: {
                    pizza_id,
                    size_id,
                    price
                }
            })
        }
    }
}

export default new Pizza()