import { FindByIdOutput } from "../../application/model/ingredient.model";
import { CreateIngredientRepository } from "../../application/repositories/ingredient/create-ingredient.repository";
import { DeleteIngredientRepository } from "../../application/repositories/ingredient/delete-ingredient.repository";
import { FindIngredientByIdRepository } from "../../application/repositories/ingredient/find-ingredient-by-id.repository";
import { GetAllIngredientsRepository } from "../../application/repositories/ingredient/get-all-ingredients.repository";
import { UpdateIngredientRepository } from "../../application/repositories/ingredient/update-ingredient.repository";
import { IngredientProps } from "../../domain/entities/ingredient.entity";
import { CreateIngredientInput } from "../../domain/usecases/ingredient/create-ingredient.usecase";
import { GetAllIngredientsOutput } from "../../domain/usecases/ingredient/get-all-ingredients.usecase";
import { UpdateIngredientInput } from "../../domain/usecases/ingredient/update-ingredient.usecase";
import prisma from "../db/prisma";

export class IngredientRepository implements
    FindIngredientByIdRepository,
    CreateIngredientRepository,
    UpdateIngredientRepository,
    GetAllIngredientsRepository,
    DeleteIngredientRepository {

    async create(ingredient: CreateIngredientInput): Promise<IngredientProps> {
        const result = await prisma.ingredient.create({
            data: ingredient
        })

        return result
    }

    async delete(id: number): Promise<boolean> {
        await prisma.ingredient.delete({
            where: { id }
        })

        return true
    }

    async index(): Promise<GetAllIngredientsOutput> {
        const result = await prisma.ingredient.findMany()

        return result
    }

    async update(ingredient: UpdateIngredientInput, id: number): Promise<IngredientProps> {
        const result = await prisma.ingredient.update({
            where: { id },
            data: ingredient
        })

        return result
    }

    async find(id: number): Promise<FindByIdOutput> {
        console.log(typeof id);
        const result = await prisma.ingredient.findUnique({
            where: { id }
        })
        console.log(result);

        return result
    }

}