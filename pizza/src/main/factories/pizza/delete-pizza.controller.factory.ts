import { DeletePizza } from "../../../application/services/pizza/delete-pizza.service"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { DeletePizzaController } from "../../../presentation/controllers/pizza/delete-pizza.controller"

export const makeDeletePizzaController = () => {
    const repository = new PizzaRepository()
    const loader = new DeletePizza(repository, repository)
    return new DeletePizzaController(loader)
}