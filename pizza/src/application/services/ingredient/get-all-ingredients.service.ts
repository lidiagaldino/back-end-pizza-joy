import { get } from "http";
import { GetALlIngredientsUseCase, GetAllIngredientsOutput } from "../../../domain/usecases/ingredient/get-all-ingredients.usecase";
import { GetAllIngredientsRepository } from "../../repositories/ingredient/get-all-ingredients.repository";

export class GetAllIngredients implements GetALlIngredientsUseCase {
    constructor(
        private readonly getAllIngredientsRepository: GetAllIngredientsRepository
    ) { }

    async index(): Promise<GetAllIngredientsOutput> {
        const result = await this.getAllIngredientsRepository.index()
        if (!result) throw new Error('NOT_FOUND')

        return result
    }
}