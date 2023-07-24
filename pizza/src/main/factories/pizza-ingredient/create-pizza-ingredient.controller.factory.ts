import { CreatePizzaIngredient } from "../../../application/services/pizza-ingredient/create-pizza-ingredient.service"
import { IngredientRepository } from "../../../infra/repositories/ingredient.repository"
import { PizzaIngredientRepository } from "../../../infra/repositories/pizza-ingredient.repository"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { CreatePizzaIngredientController } from "../../../presentation/controllers/pizza-ingredient/create-pizza-ingredient.controller"

export const makeCreatePizzaIngredientController = (schema: any) => {
    const repository = new PizzaIngredientRepository()
    const ingredientRepository = new IngredientRepository()
    const pizzaRepository = new PizzaRepository()
    const validation = new YupAdapter()
    const loader = new CreatePizzaIngredient(repository, ingredientRepository, pizzaRepository, validation)
    return new CreatePizzaIngredientController(loader, schema)
}