import { DeleteIngredient } from "../../../application/services/ingredient/delete-ingredient.service"
import { IngredientRepository } from "../../../infra/repositories/ingredient.repository"
import { DeleteIngredientController } from "../../../presentation/controllers/ingredient/delete-ingredient.controller"

export const makeDeleteIngredientController = () => {
    const repository = new IngredientRepository()
    const loader = new DeleteIngredient(repository, repository)
    return new DeleteIngredientController(loader)
}