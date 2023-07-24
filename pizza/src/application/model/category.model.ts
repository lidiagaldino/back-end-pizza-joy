import { CreateCategoryInput, CreateCategoryOutput } from "../../domain/usecases/category/create-category.usecase"
import { DeleteCategoryInput, DeleteCategoryOutput } from "../../domain/usecases/category/delete-category.usecase"
import { FindPizzaByCategoryOutput } from "../../domain/usecases/category/find-pizza-by-category.usecase"
import { GetAllCategoriesOutput } from "../../domain/usecases/category/get-all-categories.usecase"
import { UpdateCategoryInput, UpdateCategoryOutput } from "../../domain/usecases/category/update-category.usecase"

export type FindByIdInput = number
export type FindByIdOutput = { id: number, name: string }

export type CreateInput = CreateCategoryInput
export type CreateOutput = CreateCategoryOutput

export type GetAllOutput = GetAllCategoriesOutput

export type DeleteInput = DeleteCategoryInput
export type DeleteOutput = DeleteCategoryOutput

export type UpdateInput = UpdateCategoryInput
export type UpdateOutput = UpdateCategoryOutput

export type findByCategoryOutput = FindPizzaByCategoryOutput