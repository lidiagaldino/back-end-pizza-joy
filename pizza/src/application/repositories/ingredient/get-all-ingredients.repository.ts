import { GetAllOutput } from "../../model/ingredient.model";

export interface GetAllIngredientsRepository {
    index(): Promise<GetAllOutput>
}