import { CreateIngredientInput, CreateIngredientOutput } from "../../domain/usecases/ingredient/create-ingredient.usecase"
import { FindIngredientByIdOutput } from "../../domain/usecases/ingredient/find-ingredient-by-id.usecase"
import { GetAllIngredientsOutput } from "../../domain/usecases/ingredient/get-all-ingredients.usecase"
import { UpdateIngredientInput, UpdateIngredientOutput } from "../../domain/usecases/ingredient/update-ingredient.usecase"

export type FindByIdInput = number
export type FindByIdOutput = FindIngredientByIdOutput

export type CreateInput = CreateIngredientInput
export type CreateOutput = CreateIngredientOutput

export type UpdateInput = UpdateIngredientInput
export type UpdateOutput = UpdateIngredientOutput

export type GetAllOutput = GetAllIngredientsOutput

export type DeleteInput = number
export type DeleteOutput = boolean
