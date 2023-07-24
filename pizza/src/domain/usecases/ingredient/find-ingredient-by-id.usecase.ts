import { IngredientProps } from "../../entities/ingredient.entity"

export interface FindIngredientByIdUseCase {
    find(id: number): Promise<FindIngredientByIdOutput>
}

export type FindIngredientByIdOutput = IngredientProps