import { CreateIngredient } from "../../../application/services/ingredient/create-ingredient.service"
import { IngredientRepository } from "../../../infra/repositories/ingredient.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { CreateIngredientController } from "../../../presentation/controllers/ingredient/create-ingredient.controller"

export const makeCreateIngredientController = (schema: any) => {
    const repository = new IngredientRepository()
    const validation = new YupAdapter()
    const loader = new CreateIngredient(repository, validation)
    return new CreateIngredientController(loader, schema)
}