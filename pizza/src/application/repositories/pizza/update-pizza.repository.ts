import { UpdateInput, UpdateOutput } from "../../model/pizza.model";

export interface UpdatePizzaRepository {
    update(pizza: UpdateInput, id: number): Promise<UpdateOutput>
}