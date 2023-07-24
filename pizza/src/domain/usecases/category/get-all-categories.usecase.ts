import { CategoryProps } from "../../entities/category.entity"

export interface GetAllCategoriesUseCase {
    show(): Promise<GetAllCategoriesOutput>
}

export type GetAllCategoriesOutput = CategoryProps[]