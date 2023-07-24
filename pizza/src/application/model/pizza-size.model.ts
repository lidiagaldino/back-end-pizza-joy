import { DeletePizzaSizeInput, DeletePizzaSizeOutput } from "../../domain/usecases/pizza-size/delete-pizza-size.usecase";
import { CreatePizzaSizeInput, CreatePizzaSizeOutput } from "../../domain/usecases/pizza-size/create-pizza-size.usecase";

export type CreateInput = {
    price: number,
    pizza_id: number,
    size_id: number
}
export type CreateOutput = CreatePizzaSizeOutput

export type DeleteInput = DeletePizzaSizeInput
export type DeleteOutput = DeletePizzaSizeOutput