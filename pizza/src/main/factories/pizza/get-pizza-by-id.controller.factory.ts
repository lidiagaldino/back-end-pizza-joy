import { GetPizzaById } from "../../../application/services/pizza/get-pizza-by-id.service"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { GetPizzaByIdController } from "../../../presentation/controllers/pizza/get-pizza-by-id.controller"

export const makeGetPizzaByIdController = () => {
    const repository = new PizzaRepository()
    const loader = new GetPizzaById(repository)
    return new GetPizzaByIdController(loader)
}