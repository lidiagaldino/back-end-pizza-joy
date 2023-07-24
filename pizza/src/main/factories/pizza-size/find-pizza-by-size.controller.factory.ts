import { FindPizzaBySize } from "../../../application/services/pizza-size/find-pizza-by-size.service"
import { PizzaSizeRepository } from "../../../infra/repositories/pizza-size.repository"
import { FindPizzaBySizeController } from "../../../presentation/controllers/pizza-size/find-pizza-by-size.controller"

export const makeFindPizzaBySizeController = () => {
    const repository = new PizzaSizeRepository()
    const loader = new FindPizzaBySize(repository)
    return new FindPizzaBySizeController(loader)
}