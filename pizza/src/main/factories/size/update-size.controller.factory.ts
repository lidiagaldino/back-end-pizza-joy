import { UpdateSize } from "../../../application/services/size/update-size.service"
import { PizzaRepository } from "../../../infra/repositories/pizza.repository"
import { SizeRepository } from "../../../infra/repositories/size.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { UpdateSizeController } from "../../../presentation/controllers/size/update-size.controller"

export const makeUpdateSizeController = (schema: any) => {
    const repository = new SizeRepository()
    const pizzaRepository = new PizzaRepository()
    const validation = new YupAdapter()
    const loader = new UpdateSize(repository, repository, pizzaRepository, pizzaRepository, validation)
    return new UpdateSizeController(loader, schema)
}