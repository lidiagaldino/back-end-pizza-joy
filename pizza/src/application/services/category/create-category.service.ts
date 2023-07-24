import { CategoryProps } from "../../../domain/entities/category.entity";
import { CreateCategoryInput, CreateCategoryUseCase } from "../../../domain/usecases/category/create-category.usecase";
import { Validation } from "../../model/validate.model";
import { CreateCategoryRepository } from "../../repositories/category/create-category.repository";

export class CreateCategory implements CreateCategoryUseCase {
    constructor(
        private readonly createCategoryRepository: CreateCategoryRepository,
        private readonly validation: Validation
    ) { }

    async create(category: CreateCategoryInput, schema: any): Promise<CategoryProps> {
        this.validation.validate(schema, category)

        const result = await this.createCategoryRepository.create(category)
        return result
    }
}