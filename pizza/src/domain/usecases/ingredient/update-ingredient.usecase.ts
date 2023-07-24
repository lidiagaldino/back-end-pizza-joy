import { IngredientProps } from "../../entities/ingredient.entity"

export interface UpdateIngredientUseCase {
    update(ingredient: UpdateIngredientInput, id: number, schema: any): Promise<UpdateIngredientOutput>
}

export type UpdateIngredientInput = Omit<IngredientProps, 'id'>
export type UpdateIngredientOutput = IngredientProps