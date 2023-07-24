import { GetAllPizzas } from "../../../application/services/pizza/get-all-pizzas.service"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { GetAllPizzasController } from "../../../presentation/controllers/pizza/get-all-pizzas.controller"

export const makeGetAllPizzasController = () => {
    const repository = new PizzaRepository()
    const loader = new GetAllPizzas(repository)
    return new GetAllPizzasController(loader)
}