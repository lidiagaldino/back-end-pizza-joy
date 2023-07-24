import { CategoryProps } from "../../../domain/entities/category.entity";
import { GetCategoryByIdUseCase } from "../../../domain/usecases/category/get-category-by-id.usecase";
import { FindCategoryByIdRepository } from "../../repositories/category/find-category-by-id.repository";

export class GetCategoryById implements GetCategoryByIdUseCase {
    constructor(
        private readonly getCategoryByIdRepository: FindCategoryByIdRepository
    ) { }

    async find(id: number): Promise<CategoryProps> {
        const result = await this.getCategoryByIdRepository.find(id)
        if (!result) throw new Error('CATEGORY_NOT_FOUND')

        return result
    }
}