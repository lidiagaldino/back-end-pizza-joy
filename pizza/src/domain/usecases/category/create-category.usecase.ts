import { CategoryProps } from "../../entities/category.entity"

export interface CreateCategoryUseCase {
    create(category: CreateCategoryInput, schema): Promise<CreateCategoryOutput>
}

export type CreateCategoryInput = Omit<CategoryProps, 'id'>
export type CreateCategoryOutput = CategoryProps