import { DeletePizzaIngredient } from "../../../application/services/pizza-ingredient/delete-pizza-ingredient.service"
import { IngredientRepository } from "../../../infra/repositories/ingredient.repository"
import { PizzaIngredientRepository } from "../../../infra/repositories/pizza-ingredient.repository"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { DeletePizzaIngredientController } from "../../../presentation/controllers/pizza-ingredient/delete-pizza-ingredient.controller"

export const makeDeletePizzaIngredientController = (schema: any) => {
    console.log('sou');
    const respository = new PizzaIngredientRepository()
    const pizzaRepository = new PizzaRepository()
    const ingredientRepository = new IngredientRepository()
    const validation = new YupAdapter()
    const loader = new DeletePizzaIngredient(respository, ingredientRepository, pizzaRepository, validation)
    return new DeletePizzaIngredientController(loader, schema)
}