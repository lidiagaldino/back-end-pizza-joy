import { DeleteCategory } from "../../../application/services/category/delete-category.service"
import { CategoryRepository } from "../../../infra/repositories/category.repository"
import { DeleteCategoryController } from "../../../presentation/controllers/category/delete-category.controller"

export const makeDeleteCategoryController = () => {
    const repository = new CategoryRepository()
    const loader = new DeleteCategory(repository, repository)
    return new DeleteCategoryController(loader)
}