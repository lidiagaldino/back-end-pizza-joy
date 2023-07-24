import { CreatePizzaSizeService } from "../../../application/services/pizza-size/create-pizza-size.service"
import { PizzaSizeRepository } from "../../../infra/repositories/pizza-size.repository"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { SizeRepository } from "../../../infra/repositories/size.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { CreatePizzaSizeController } from "../../../presentation/controllers/pizza-size/create-pizza-size.controller"
import { CreatePizzaController } from "../../../presentation/controllers/pizza/create-pizza.controller"

export const makeCreatePizzaSizeController = (schema: any) => {
    const repository = new PizzaSizeRepository()
    const pizzaRepository = new PizzaRepository()
    const sizeRepository = new SizeRepository()
    const validation = new YupAdapter()
    const loader = new CreatePizzaSizeService(repository, pizzaRepository, sizeRepository, validation)
    return new CreatePizzaSizeController(loader, schema)
}