import { CreateInput, CreateOutput } from "../../model/ingredient.model";

export interface CreateIngredientRepository {
    create(ingredient: CreateInput): Promise<CreateOutput>
}