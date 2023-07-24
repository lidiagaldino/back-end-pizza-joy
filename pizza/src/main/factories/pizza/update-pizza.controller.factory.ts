import { UpdatePizza } from "../../../application/services/pizza/update-pizza.service"
import { CategoryRepository } from "../../../infra/repositories/category.repository"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { UpdatePizzaController } from "../../../presentation/controllers/pizza/update-pizza.controller"

export const makeUpdatePizzaController = (schema: any) => {
    const pizzaRepository = new PizzaRepository()
    const categoryRepository = new CategoryRepository()
    const validation = new YupAdapter()
    const loader = new UpdatePizza(pizzaRepository, categoryRepository, validation)
    return new UpdatePizzaController(loader, schema)
}