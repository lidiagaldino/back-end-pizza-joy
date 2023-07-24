import { GetAllCategories } from "../../../application/services/category/get-all-categories.service"
import { CategoryRepository } from "../../../infra/repositories/category.repository"
import { GetAllCategoriesController } from "../../../presentation/controllers/category/get-all-categories.controller"

export const makeGetAllCategoriesController = () => {
    const repository = new CategoryRepository()
    const loader = new GetAllCategories(repository)
    return new GetAllCategoriesController(loader)
}