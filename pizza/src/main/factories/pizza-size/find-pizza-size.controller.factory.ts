import { FindPizzaSizes } from "../../../application/services/pizza-size/find-pizzas-size.service"
import { PizzaSizeRepository } from "../../../infra/repositories/pizza-size.repository"
import { FindPizzaSizeController } from "../../../presentation/controllers/pizza-size/find-pizza-size.controller"

export const makeFindPizzaSizeController = () => {
    const repository = new PizzaSizeRepository()
    const loader = new FindPizzaSizes(repository)
    return new FindPizzaSizeController(loader)
}