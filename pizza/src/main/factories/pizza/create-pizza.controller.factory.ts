import { CreatePizza } from "../../../application/services/pizza/create-pizza.service"
import { CategoryRepository } from "../../../infra/repositories/category.repository"
import { IngredientRepository } from "../../../infra/repositories/ingredient.repository"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { SizeRepository } from "../../../infra/repositories/size.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { CreatePizzaController } from "../../../presentation/controllers/pizza/create-pizza.controller"

export const makeCreatePizzaController = (schema: any) => {
    const pizzaRepository = new PizzaRepository()
    const sizeRepository = new SizeRepository()
    const ingredientRepository = new IngredientRepository()
    const categoryRepository = new CategoryRepository()
    const validation = new YupAdapter()
    const loader = new CreatePizza(pizzaRepository, validation, sizeRepository, ingredientRepository, categoryRepository)
    return new CreatePizzaController(loader, schema)
}