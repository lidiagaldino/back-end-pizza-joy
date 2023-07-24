import { CategoryProps } from "../../entities/category.entity"

export interface GetCategoryByIdUseCase {
    find(id: GetCategoryByIdInput): Promise<GetCategoryByIdOutput>
}

export type GetCategoryByIdInput = number
export type GetCategoryByIdOutput = CategoryProps