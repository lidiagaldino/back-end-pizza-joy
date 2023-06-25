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
                    photo: pizza.photo,
                    ingredient: {
                        createMany: {
                            data: pizza.ingredient
                        }
                    },
                    pizza_size: {
                        createMany: {
                            data
                        }
                    },
                    catergory: {
                        connect: {
                            id: pizza.category.category_id
                        }
                    }
                },
                include: {
                    ingredient: {
                        include: {
                            ingredient: true
                        }
                    },
                    pizza_size: {
                        include: {
                            size: true
                        }
                    },
                    catergory: true
                }
            })

            const response: IPizza = {
                id: result.id,
                description: result.description,
                name: result.name,
                photo: result.photo,
                category: { category_id: result.category_id, name: result.catergory.name },
                ingredient: result.ingredient.map(item => { return { ingredient_id: item.ingredient_id, name: item.ingredient.name } }),
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
                    photo: pizza.photo,
                    category_id: pizza.category.category_id
                }
            })

            const response: Omit<IPizza, "ingredient" | "size"> = {
                id: result.id,
                description: result.description,
                name: result.name,
                photo: result.photo,
                category: { category_id: result.category_id }
            }

            return response
        } catch (error) {
            return false
        }
    }

    async deletePizza(id: number): Promise<boolean> {
        try {
            await prisma.pizza.delete({
                where: {
                    id
                }
            })


            return true
        } catch (error) {
            return false
        }
    }

    async getPizzas(): Promise<IPizza[] | false> {
        const pizzas = await prisma.pizza.findMany({
            include: {
                ingredient: {
                    select: {
                        ingredient: true
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
                    photo: item.photo,
                    category: { category_id: item.category_id },
                    ingredient: item.ingredient.map(ing => { return { ingredient_id: ing.ingredient.id, name: ing.ingredient.name } }),
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
                        ingredient: true
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
                photo: pizza.photo,
                category: { category_id: pizza.category_id },
                ingredient: pizza.ingredient.map(ing => { return { ingredient_id: ing.ingredient.id, name: ing.ingredient.name } }),
                size: pizza.pizza_size.map(siz => { return { size_id: siz.size_id, name: siz.size.name, price: siz.price } })
            }

            return response
        }

        return false
    }
}

export default new Pizza()