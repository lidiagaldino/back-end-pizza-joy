import { CreateInput } from "../../application/model/pizza-size.model";
import { CreatePizzaSizeRepository } from "../../application/repositories/pizza-size/create-pizza-size.repository";
import { DeletePizzaSizeRepository } from "../../application/repositories/pizza-size/delete-pizza-ingredient.repository";
import { CreatePizzaSizeInput, CreatePizzaSizeOutput } from "../../domain/usecases/pizza-size/create-pizza-size.usecase";
import { DeletePizzaSizeInput } from "../../domain/usecases/pizza-size/delete-pizza-size.usecase";
import prisma from "../db/prisma";

export class PizzaSizeRepository implements
    DeletePizzaSizeRepository,
    CreatePizzaSizeRepository {

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