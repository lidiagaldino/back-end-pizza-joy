import { UpdateInput, UpdateOutput } from "../../model/ingredient.model";

export interface UpdateIngredientRepository {
    update(ingredient: UpdateInput, id: number): Promise<UpdateOutput>
}