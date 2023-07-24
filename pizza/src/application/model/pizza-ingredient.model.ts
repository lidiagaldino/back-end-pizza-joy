import { DeletePizzaIngredientInput, DeletePizzaIngredientOutput } from "../../domain/usecases/pizza-ingredient/delete-pizza-ingredient.usecase";
import { CreatePizzaIngredientInput, CreatePizzaIngredientOutput } from "../../domain/usecases/pizza-ingredient/create-pizza-ingredient.usecase";
import { FindPizzaByIngredient } from "../../domain/usecases/pizza-ingredient/find-pizza-by-ingredient.usecase";

export type CreateInput = CreatePizzaIngredientInput
export type CreateOutput = CreatePizzaIngredientOutput

export type DeleteInput = DeletePizzaIngredientInput
export type DeleteOutput = DeletePizzaIngredientOutput

export type GetByIdInput = number
export type GetByIdOutput = FindPizzaByIngredient