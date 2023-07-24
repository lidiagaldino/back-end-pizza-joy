import { CategoryProps } from "../../../domain/entities/category.entity";
import { UpdateCategoryInput, UpdateCategoryUseCase } from "../../../domain/usecases/category/update-category.usecase";
import { Validation } from "../../model/validate.model";
import { FindCategoryByIdRepository } from "../../repositories/category/find-category-by-id.repository";
import { UpdateCategoryRepository } from "../../repositories/category/update-category.repository";

export class UpdateCategory implements UpdateCategoryUseCase {
    constructor(
        private readonly updateCategoryRepository: UpdateCategoryRepository,
        private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
        private readonly validation: Validation
    ) { }

    async update(category: UpdateCategoryInput, id: number, schema: any): Promise<CategoryProps> {
        this.validation.validate(schema, category)

        const verifyIfExists = await this.findCategoryByIdRepository.find(id)
        if (!verifyIfExists) throw new Error('CATEGORY_NOT_FOUND')

        const update = this.updateCategoryRepository.update(category, id)
        return update
    }
}