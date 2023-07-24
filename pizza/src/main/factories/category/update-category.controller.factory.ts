import { UpdateCategory } from "../../../application/services/category/update-category.service"
import { CategoryRepository } from "../../../infra/repositories/category.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { UpdateCategoryController } from "../../../presentation/controllers/category/update-category.controller"

export const makeUpdateCategoryController = (schema: any) => {
    const repository = new CategoryRepository()
    const validation = new YupAdapter()
    const loader = new UpdateCategory(repository, repository, validation)
    return new UpdateCategoryController(loader, schema)
}