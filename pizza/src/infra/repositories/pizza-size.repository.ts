import { CreateInput, FindPizzaSizeInput } from "../../application/model/pizza-size.model";
import { CreatePizzaSizeRepository } from "../../application/repositories/pizza-size/create-pizza-size.repository";
import { DeletePizzaSizeRepository } from "../../application/repositories/pizza-size/delete-pizza-ingredient.repository";
import { FindPizzaBySizeRepository } from "../../application/repositories/pizza-size/find-pizza-by-size.repository";
import { FindPizzasSizeRepository } from "../../application/repositories/pizza-size/find-pizzas-size.repository";
import { CreatePizzaSizeInput, CreatePizzaSizeOutput } from "../../domain/usecases/pizza-size/create-pizza-size.usecase";
import { DeletePizzaSizeInput } from "../../domain/usecases/pizza-size/delete-pizza-size.usecase";
import { FindPizzaBySizeOutput } from "../../domain/usecases/pizza-size/find-pizza-by-size.usecase";
import { FindPizzasSizeOutput } from "../../domain/usecases/pizza-size/find-pizzas-size.usecase";
import prisma from "../db/prisma";

export class PizzaSizeRepository implements
    DeletePizzaSizeRepository,
    CreatePizzaSizeRepository,
    FindPizzaBySizeRepository,
    FindPizzasSizeRepository {

    async findPizzasSize(data: FindPizzaSizeInput): Promise<FindPizzasSizeOutput> {
        const result = await prisma.pizzaSize.findMany({
            where: data,
            include: { pizza: true }
        })

        if (result.length > 0) {
            return { id: result[0].id, name: result[0].pizza.name, photo: result[0].pizza.photo, price: result[0].price, size_id: result[0].size_id }
        }

        throw new Error('NOT_FOUND')
    }

    async findBySize(size_id: number): Promise<FindPizzaBySizeOutput> {
        const result = await prisma.pizzaSize.findMany({
            where: {
                size_id
            },
            select: {
                pizza: {
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
                        },
                        catergory: true
                    }
                }
            }
        })

        let pizzas = []

        if (result.length > 0) {
            pizzas = result.map(item => {
                return {
                    id: item.pizza.id,
                    description: item.pizza.description,
                    name: item.pizza.name,
                    photo: item.pizza.photo,
                    category: { id: item.pizza.category_id, name: item.pizza.catergory.name },
                    ingredient: item.pizza.ingredient.map(ing => {
                        return { id: ing.ingredient.id, name: ing.ingredient.name, price: ing.ingredient.price }
                    }),
                    size: item.pizza.pizza_size.map(siz => { return { id: siz.size_id, name: siz.size.name, price: siz.price } })
                }
            })

            return pizzas
        }
    }

    async create(data: CreateInput): Promise<CreatePizzaSizeOutput> {
        const result = await prisma.pizzaSize.create({
            data
        })

        return result
    }

    async delete(data: DeletePizzaSizeInput): Promise<boolean> {
        await prisma.pizzaSize.deleteMany({
            where: data
        })

        return true
    }
}