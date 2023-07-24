import { CreatePizzaCategoryInput, CreatePizzaCategoryOutput, UpdatePizzaInput, UpdatePizzaOutput, UpdatePizzaUseCase } from "../../../domain/usecases/pizza/update-pizza.usecase";
import { Validation } from "../../model/validate.model";
import { FindCategoryByIdRepository } from "../../repositories/category/find-category-by-id.repository";
import { UpdatePizzaRepository } from "../../repositories/pizza/update-pizza.repository";

export class UpdatePizza implements UpdatePizzaUseCase {
    constructor(
        private readonly updatePizzaRepository: UpdatePizzaRepository,
        private readonly findCategoryByIdRepository: FindCategoryByIdRepository,
        private readonly validation: Validation
    ) { }
    async update(pizza: UpdatePizzaInput, id: number, schema: any): Promise<UpdatePizzaOutput> {
        this.validation.validate(schema, pizza)

        await this.verifyIfCategoryExists(pizza.category)
        const result = await this.updatePizzaRepository.update(pizza, id)
        return result
    }

    async verifyIfCategoryExists(category: CreatePizzaCategoryInput): Promise<CreatePizzaCategoryOutput> {
        const result = await this.findCategoryByIdRepository.find(category.category_id)
        if (!category) throw new Error('CATEGORY_NOT_FOUND')
        return { category_id: result.id, name: result.name }
    }

}