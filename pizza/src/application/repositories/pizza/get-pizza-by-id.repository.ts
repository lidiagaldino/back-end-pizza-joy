import { GetByIdInput, GetByIdOutput } from "../../model/pizza.model";

export interface GetPizzaByIdRepository {
    find(id: GetByIdInput): Promise<GetByIdOutput>
}