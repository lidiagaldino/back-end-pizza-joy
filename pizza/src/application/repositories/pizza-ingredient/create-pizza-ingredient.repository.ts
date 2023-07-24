import { CreateInput, CreateOutput } from "../../model/pizza-ingredient.model";

export interface CreatePizzaIngredientRepository {
    create(data: CreateInput): Promise<CreateOutput>
}