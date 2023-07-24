import { DeleteInput, DeleteOutput } from "../../model/pizza.model";

export interface DeletePizzaRepository {
    delete(id: DeleteInput): Promise<DeleteOutput>
}