import { DeleteCategoryUseCase } from "../../../domain/usecases/category/delete-category.usecase";
import { DeleteCategoryRepository } from "../../repositories/category/delete-category.repository";
import { FindCategoryByIdRepository } from "../../repositories/category/find-category-by-id.repository";

export class DeleteCategory implements DeleteCategoryUseCase {
    constructor(
        private readonly deleteCategoryRepository: DeleteCategoryRepository,
        private readonly findCategoryById: FindCategoryByIdRepository
    ) { }

    async delete(id: number): Promise<boolean> {
        const verifyIfExists = await this.findCategoryById.find(id)
        if (!verifyIfExists) throw new Error('CATEGORY_NOT_FOUND')

        this.deleteCategoryRepository.delete(id)
        return true
    }
}