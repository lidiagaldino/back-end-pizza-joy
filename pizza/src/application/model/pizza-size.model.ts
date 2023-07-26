import { DeletePizzaSizeInput, DeletePizzaSizeOutput } from "../../domain/usecases/pizza-size/delete-pizza-size.usecase";
import { CreatePizzaSizeOutput } from "../../domain/usecases/pizza-size/create-pizza-size.usecase";
import { FindPizzaBySizeOutput } from "../../domain/usecases/pizza-size/find-pizza-by-size.usecase";
import { FindPizzasSizeOutput } from "../../domain/usecases/pizza-size/find-pizzas-size.usecase";

export type CreateInput = {
    price: number,
    pizza_id: number,
    size_id: number
}
export type CreateOutput = CreatePizzaSizeOutput

export type DeleteInput = DeletePizzaSizeInput
export type DeleteOutput = DeletePizzaSizeOutput

export type FindPizzaInput = number
export type FindPizzaOutput = FindPizzaBySizeOutput

export type FindPizzaSizeInput = { pizza_id: number, size_id: number }
export type FindPizzaSizeOutput = FindPizzasSizeOutput 