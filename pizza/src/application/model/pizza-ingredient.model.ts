import { DeletePizzaIngredientInput, DeletePizzaIngredientOutput } from "../../domain/usecases/pizza-ingredient/delete-pizza-ingredient.usecase";
import { CreatePizzaIngredientInput, CreatePizzaIngredientOutput } from "../../domain/usecases/pizza-ingredient/create-pizza-ingredient.usecase";

export type CreateInput = CreatePizzaIngredientInput
export type CreateOutput = CreatePizzaIngredientOutput

export type DeleteInput = DeletePizzaIngredientInput
export type DeleteOutput = DeletePizzaIngredientOutput