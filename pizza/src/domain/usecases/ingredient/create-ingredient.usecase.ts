import { IngredientProps } from "../../entities/ingredient.entity"

export interface CreateIngredientUseCase {
    create(ingredient: CreateIngredientInput, schema: any): Promise<CreateIngredientOutput>
}

export type CreateIngredientInput = Omit<IngredientProps, 'id'>
export type CreateIngredientOutput = IngredientProps