import { UpdateIngredient } from "../../../application/services/ingredient/update-ingredient.service"
import { IngredientRepository } from "../../../infra/repositories/ingredient.repository"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { UpdateIngredientController } from "../../../presentation/controllers/ingredient/update-ingredient.controller"

export const makeUpdateIngredientController = (schema: any) => {
    const repository = new IngredientRepository()
    const pizzaRepository = new PizzaRepository()
    const validation = new YupAdapter()
    const loader = new UpdateIngredient(repository, repository, pizzaRepository, pizzaRepository, validation)
    return new UpdateIngredientController(loader, schema)
}