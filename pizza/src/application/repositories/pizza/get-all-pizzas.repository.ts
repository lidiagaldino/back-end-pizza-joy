import { GetAllOutput } from "../../model/pizza.model";

export interface GetAllPizzasRepository {
    index(): Promise<GetAllOutput>
}