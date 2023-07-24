import { FindByIdInput, FindByIdOutput } from "../../model/ingredient.model";

export interface FindIngredientByIdRepository {
    find(id: FindByIdInput): Promise<FindByIdOutput>
}