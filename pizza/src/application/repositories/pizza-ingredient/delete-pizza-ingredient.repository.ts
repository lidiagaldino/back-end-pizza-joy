import { DeleteInput, DeleteOutput } from "../../model/pizza-ingredient.model";

export interface DeletePizzaIngredientRepository {
    delete(data: DeleteInput): Promise<DeleteOutput>
}