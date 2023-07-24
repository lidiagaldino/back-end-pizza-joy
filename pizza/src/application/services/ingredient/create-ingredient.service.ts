import { IngredientProps } from "../../../domain/entities/ingredient.entity";
import { CreateIngredientInput, CreateIngredientUseCase } from "../../../domain/usecases/ingredient/create-ingredient.usecase";
import { Validation } from "../../model/validate.model";
import { CreateIngredientRepository } from "../../repositories/ingredient/create-ingredient.repository";

export class CreateIngredient implements CreateIngredientUseCase {
    constructor(
        private readonly createIngredientRepository: CreateIngredientRepository,
        private readonly validation: Validation
    ) { }

    async create(ingredient: CreateIngredientInput, schema: any): Promise<IngredientProps> {
        this.validation.validate(schema, ingredient)

        const result = await this.createIngredientRepository.create(ingredient)
        return result
    }
}