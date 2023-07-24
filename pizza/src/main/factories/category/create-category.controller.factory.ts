import { CreateCategory } from "../../../application/services/category/create-category.service"
import { CategoryRepository } from "../../../infra/repositories/category.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { CreateCategoryController } from "../../../presentation/controllers/category/create-category.controller"

export const makeCreateCategoryController = (schema: any) => {
    const repository = new CategoryRepository()
    const validation = new YupAdapter()
    const loader = new CreateCategory(repository, validation)
    return new CreateCategoryController(loader, schema)
}