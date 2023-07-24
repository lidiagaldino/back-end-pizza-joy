import { CategoryProps } from "../../entities/category.entity"

export interface UpdateCategoryUseCase {
    update(category: UpdateCategoryInput, id: number, schema: any): Promise<UpdateCategoryOutput>
}

export type UpdateCategoryInput = Omit<CategoryProps, 'id'>
export type UpdateCategoryOutput = CategoryProps