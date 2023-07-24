import { CreateInput, CreateOutput } from "../../model/pizza.model";

export interface CreatePizzaRepository {
    create(pizza: CreateInput): Promise<CreateOutput>
}