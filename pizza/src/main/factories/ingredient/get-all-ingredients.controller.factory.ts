import { GetAllIngredients } from "../../../application/services/ingredient/get-all-ingredients.service"
import { IngredientRepository } from "../../../infra/repositories/ingredient.repository"
import { GetAllIngredientsController } from "../../../presentation/controllers/ingredient/get-all-ingredients.controller"

export const makeGetAllIngredientsController = () => {
    const repository = new IngredientRepository()
    const loader = new GetAllIngredients(repository)
    return new GetAllIngredientsController(loader)
}