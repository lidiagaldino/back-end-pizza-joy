import { DeletePizzaIngredient } from "../../../application/services/pizza-ingredient/delete-pizza-ingredient.service"
import { DeletePizzaSize } from "../../../application/services/pizza-size/delete-pizza-size.service"
import { PizzaSizeRepository } from "../../../infra/repositories/pizza-size.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { DeletePizzaIngredientController } from "../../../presentation/controllers/pizza-ingredient/delete-pizza-ingredient.controller"
import { DeletePizzaSizeController } from "../../../presentation/controllers/pizza-size/delete-pizza-size.controller"

export const makeDeletePizzaSizeController = (schema: any) => {
    const repository = new PizzaSizeRepository()
    const validation = new YupAdapter()
    const loader = new DeletePizzaSize(repository, validation)
    return new DeletePizzaSizeController(loader, schema)
}