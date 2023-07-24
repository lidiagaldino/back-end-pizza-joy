import { CreatePizzaIngredientRepository } from "../../application/repositories/pizza-ingredient/create-pizza-ingredient.repository";
import { DeletePizzaIngredientRepository } from "../../application/repositories/pizza-ingredient/delete-pizza-ingredient.repository";
import { DeletePizzaSizeRepository } from "../../application/repositories/pizza-size/delete-pizza-ingredient.repository";
import { CreatePizzaIngredientInput, CreatePizzaIngredientOutput } from "../../domain/usecases/pizza-ingredient/create-pizza-ingredient.usecase";
import { DeletePizzaIngredientInput } from "../../domain/usecases/pizza-ingredient/delete-pizza-ingredient.usecase";
import { DeletePizzaSizeInput } from "../../domain/usecases/pizza-size/delete-pizza-size.usecase";
import prisma from "../db/prisma";

export class PizzaIngredientRepository implements
    CreatePizzaIngredientRepository,
    DeletePizzaIngredientRepository {

    async create(data: CreatePizzaIngredientInput): Promise<CreatePizzaIngredientOutput> {
        const result = await prisma.pizzaIngredient.create({
            data: {
                id_pizza: data.pizza_id,
                ingredient_id: data.ingredient_id
            }
        })

        return { id: result.id, ingredient_id: result.ingredient_id, pizza_id: result.id_pizza }
    }

    async delete(data: DeletePizzaIngredientInput): Promise<boolean> {
        await prisma.pizzaIngredient.deleteMany({
            where: {
                id_pizza: data.pizza_id,
                ingredient_id: data.ingredient_id
            }
        })

        return true
    }
}