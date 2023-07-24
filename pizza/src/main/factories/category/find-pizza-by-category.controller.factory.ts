import { FindPizzaByCategory } from "../../../application/services/category/find-pizza-by-category.service"
import { CategoryRepository } from "../../../infra/repositories/category.repository"
import { FindPizzaByCategoryController } from "../../../presentation/controllers/category/find-pizza-by-category.controller"

export const makeFindPizzaByCategoryController = () => {
    const repository = new CategoryRepository()
    const loader = new FindPizzaByCategory(repository)
    return new FindPizzaByCategoryController(loader)
}