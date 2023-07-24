import { IngredientProps } from "../../entities/ingredient.entity"

export interface GetALlIngredientsUseCase {
    index(): Promise<GetAllIngredientsOutput>
}

export type GetAllIngredientsOutput = IngredientProps[]