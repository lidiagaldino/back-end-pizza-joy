import { GetCategoryById } from "../../../application/services/category/get-category-by-id.service"
import { CategoryRepository } from "../../../infra/repositories/category.repository"
import { FindCategoryByIdController } from "../../../presentation/controllers/category/find-category-by-id.controller"

export const makeFindCategoryByIdController = () => {
    const repository = new CategoryRepository()
    const loader = new GetCategoryById(repository)
    return new FindCategoryByIdController(loader)
}