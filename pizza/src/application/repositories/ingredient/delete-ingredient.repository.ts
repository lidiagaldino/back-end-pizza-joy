import { DeleteInput, DeleteOutput } from "../../model/ingredient.model";

export interface DeleteIngredientRepository {
    delete(id: DeleteInput): Promise<DeleteOutput>
}