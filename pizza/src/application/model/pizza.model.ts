import { CreatePizzaOutput } from "../../domain/usecases/pizza/create-pizza.usecase";
import { DeletePizzaInput, DeletePizzaOutput } from "../../domain/usecases/pizza/delete-pizza.usecase";
import { GetAllPizzasOutput } from "../../domain/usecases/pizza/get-all-pizzas.usecase";
import { GetPizzaByIdInput, GetPizzaByIdOutput } from "../../domain/usecases/pizza/get-pizza-by-id.usecase";
import { UpdatePizzaInput, UpdatePizzaOutput } from "../../domain/usecases/pizza/update-pizza.usecase";

export type CreateInput = {
    name: string;
    photo: string;
    description: string;
    ingredient: {
        ingredient_id: number;
    }[];
    size: {
        size_id: number;
        price: number
    }[];
    category: {
        category_id: number;
    };
}
export type CreateOutput = CreatePizzaOutput

export type UpdateInput = UpdatePizzaInput
export type UpdateOutput = UpdatePizzaOutput

export type GetAllOutput = GetAllPizzasOutput

export type GetByIdInput = GetPizzaByIdInput
export type GetByIdOutput = GetPizzaByIdOutput

export type DeleteInput = DeletePizzaInput
export type DeleteOutput = DeletePizzaOutput