import { IngredientProps } from "../../../domain/entities/ingredient.entity";
import { FindIngredientByIdUseCase } from "../../../domain/usecases/ingredient/find-ingredient-by-id.usecase";
import { FindIngredientByIdRepository } from "../../repositories/ingredient/find-ingredient-by-id.repository";

export class FindIngredientById implements FindIngredientByIdUseCase {
    constructor(
        private readonly findIngredientByIdRepository: FindIngredientByIdRepository,
    ) { }

    async find(id: number): Promise<IngredientProps> {
        const result = await this.findIngredientByIdRepository.find(id)
        if (!result) throw new Error('NOT_FOUND')

        return result
    }
}