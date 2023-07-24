import { DeleteIngredientUseCase } from "../../../domain/usecases/ingredient/delete-ingredient.usecase";
import { DeleteIngredientRepository } from "../../repositories/ingredient/delete-ingredient.repository";
import { FindIngredientByIdRepository } from "../../repositories/ingredient/find-ingredient-by-id.repository";

export class DeleteIngredient implements DeleteIngredientUseCase {
    constructor(
        private readonly deleteIngredientRepository: DeleteIngredientRepository,
        private readonly findIngredientById: FindIngredientByIdRepository
    ) { }

    async delete(id: number): Promise<boolean> {
        const verifyIfExists = await this.findIngredientById.find(id)
        if (!verifyIfExists) throw new Error('INGREDIENT_NOT_FOUND')

        await this.deleteIngredientRepository.delete(id)
        return true
    }
}