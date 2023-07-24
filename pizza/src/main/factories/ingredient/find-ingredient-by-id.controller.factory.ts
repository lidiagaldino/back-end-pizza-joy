import { FindIngredientById } from "../../../application/services/ingredient/find-ingredient-by-id.service"
import { IngredientRepository } from "../../../infra/repositories/ingredient.repository"
import { FindIngredientByIdController } from "../../../presentation/controllers/ingredient/find-ingredient-by-id.controller"

export const makeFindIngredientByIdController = () => {
    const repository = new IngredientRepository()
    const loader = new FindIngredientById(repository)
    return new FindIngredientByIdController(loader)
}