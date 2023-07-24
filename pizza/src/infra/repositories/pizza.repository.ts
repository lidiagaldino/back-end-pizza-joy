import { CreateInput } from "../../application/model/pizza.model";
import { CreatePizzaRepository } from "../../application/repositories/pizza/create-pizza.repository";
import { DeletePizzaRepository } from "../../application/repositories/pizza/delete-pizza.repository";
import { FindPizzaByIngredientRepository } from "../../application/repositories/pizza-ingredient/find-pizza-by-ingredient.repository";
import { FindPizzaBySizeRepository } from "../../application/repositories/pizza-size/find-pizza-by-size.repository";
import { GetAllPizzasRepository } from "../../application/repositories/pizza/get-all-pizzas.repository";
import { GetPizzaByIdRepository } from "../../application/repositories/pizza/get-pizza-by-id.repository";
import { UpdatePizzasPriceIngredientRepository } from "../../application/repositories/pizza/update-pizza-price-ingredient.repository";
import { UpdatePizzasPriceRepository } from "../../application/repositories/pizza/update-pizza-price-size.repository";
import { UpdatePizzaRepository } from "../../application/repositories/pizza/update-pizza.repository";
import { PizzaProps } from "../../domain/entities/pizza.entity";
import { CreatePizzaOutput } from "../../domain/usecases/pizza/create-pizza.usecase";
import { GetAllPizzasOutput } from "../../domain/usecases/pizza/get-all-pizzas.usecase";
import { GetPizzaByIdOutput } from "../../domain/usecases/pizza/get-pizza-by-id.usecase";
import { UpdatePizzaInput, UpdatePizzaOutput } from "../../domain/usecases/pizza/update-pizza.usecase";
import prisma from "../db/prisma";
import { updatePizzaPriceRepository } from "../../application/repositories/pizza/update-pizza-price.repository";

export class PizzaRepository implements
    CreatePizzaRepository,
    UpdatePizzaRepository,
    GetAllPizzasRepository,
    GetPizzaByIdRepository,
    DeletePizzaRepository,
    FindPizzaBySizeRepository,
    UpdatePizzasPriceRepository,
    FindPizzaByIngredientRepository,
    UpdatePizzasPriceIngredientRepository,
    updatePizzaPriceRepository {

    async updatePizzaPrice(data: { id: number, diferency: number }): Promise<boolean> {

        await prisma.pizzaSize.updateMany({
            where: {
                pizza_id: data.id
            },
            data: { price: { increment: data.diferency } }
        })

        return true
    }

    async updatePriceIngredient(data: { id: number; diferency: number; }): Promise<boolean> {
        if (data.diferency > 0) {
            data.diferency = data.diferency * -1
            await prisma.pizzaSize.updateMany({
                where: {
                    pizza: { ingredient: { some: { ingredient_id: data.id } } }
                },
                data: {
                    price: {
                        increment: data.diferency
                    }
                }
            })
        } else {
            await prisma.pizzaSize.updateMany({
                where: {
                    pizza: { ingredient: { some: { ingredient_id: data.id } } }
                },
                data: {
                    price: {
                        decrement: data.diferency
                    }
                }
            })
        }

        return true
    }

    async findByIngredient(ingredient_id: number): Promise<PizzaProps[]> {
        const result = await prisma.pizza.findMany({
            where: {
                ingredient: { some: { ingredient_id } },
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
                },
                catergory: true
            }
        })

        let pizzas = []

        if (result.length > 0) {
            pizzas = result.map(item => {
                return {
                    id: item.id,
                    description: item.description,
                    name: item.name,
                    photo: item.photo,
                    category: { id: item.category_id, name: item.catergory.name },
                    ingredient: item.ingredient.map(ing => {
                        return { id: ing.ingredient.id, name: ing.ingredient.name, price: ing.ingredient.price }
                    }),
                    size: item.pizza_size.map(siz => { return { id: siz.size_id, name: siz.size.name, price: siz.price } })
                }
            })

            return pizzas
        }

        return pizzas
    }

    async updatePrice(data: { id: number; diferency: number; }): Promise<boolean> {
        if (data.diferency > 0) {
            data.diferency = data.diferency * -1
            await prisma.pizzaSize.updateMany({
                where: { size_id: data.id },
                data: {
                    price: {
                        increment: data.diferency
                    }
                }
            })
        } else {
            await prisma.pizzaSize.updateMany({
                where: { size_id: data.id },
                data: {
                    price: {
                        decrement: data.diferency
                    }
                }
            })
        }


        return true
    }

    async findBySize(size_id: number): Promise<PizzaProps[]> {
        const result = await prisma.pizza.findMany({
            where: {
                pizza_size: { some: { size_id } },
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
                },
                catergory: true
            }
        })

        let pizzas = []

        if (result.length > 0) {
            pizzas = result.map(item => {
                return {
                    id: item.id,
                    description: item.description,
                    name: item.name,
                    photo: item.photo,
                    category: { id: item.category_id, name: item.catergory.name },
                    ingredient: item.ingredient.map(ing => {
                        return { id: ing.ingredient.id, name: ing.ingredient.name, price: ing.ingredient.price }
                    }),
                    size: item.pizza_size.map(siz => { return { id: siz.size_id, name: siz.size.name, price: siz.price } })
                }
            })

            return pizzas
        }

        return pizzas
    }

    async delete(id: number): Promise<boolean> {
        await prisma.pizza.delete({
            where: { id }
        })

        return true
    }

    async find(id: number): Promise<GetPizzaByIdOutput> {
        const result = await prisma.pizza.findUnique({
            where: { id },
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
        })

        let pizza: any

        if (result) {
            pizza = {
                id: result.id,
                name: result.name,
                description: result.description,
                photo: result.photo,
                category: { id: result.category_id, name: result.catergory.name },
                ingredient: result.ingredient.map(ing => {
                    return { id: ing.ingredient.id, name: ing.ingredient.name, price: ing.ingredient.price }
                }),
                size: result.pizza_size.map(siz => { return { id: siz.size_id, name: siz.size.name, price: siz.price } })
            }

            return pizza
        }

        return pizza
    }

    async index(): Promise<GetAllPizzasOutput> {
        const result = await prisma.pizza.findMany({
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
        })

        let pizzas = []

        if (result.length > 0) {
            pizzas = result.map(item => {
                return {
                    id: item.id,
                    description: item.description,
                    name: item.name,
                    photo: item.photo,
                    category: { id: item.category_id, name: item.catergory.name },
                    ingredient: item.ingredient.map(ing => {
                        return { id: ing.ingredient.id, name: ing.ingredient.name, price: ing.ingredient.price }
                    }),
                    size: item.pizza_size.map(siz => { return { id: siz.size_id, name: siz.size.name, price: siz.price } })
                }
            })

            return pizzas
        }

        return pizzas
    }

    async update(pizza: UpdatePizzaInput, id: number): Promise<UpdatePizzaOutput> {
        const result = await prisma.pizza.update({
            where: { id },
            data: {
                name: pizza.name,
                description: pizza.description,
                photo: pizza.photo,
                category_id: pizza.category.category_id
            }
        })

        return { id: result.id, name: result.name, description: result.description, photo: result.photo, category: { category_id: result.category_id } }
    }
    async create(pizza: CreateInput): Promise<CreatePizzaOutput> {
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

        const pizzaCreated: CreatePizzaOutput = {
            id: result.id,
            description: result.description,
            name: result.name,
            photo: result.photo,
            category: { category_id: result.catergory.id, name: result.catergory.name },
            ingredient: result.ingredient.map(item => { return { ingredient_id: item.ingredient_id, name: item.ingredient.name } }),
            size: result.pizza_size.map((item) => { return { size_id: item.size_id, price: item.price, name: item.size.name } })
        }

        return pizzaCreated
    }
}