import { GetPizzaByIdOutput, GetPizzaByIdUseCase } from "../../../domain/usecases/pizza/get-pizza-by-id.usecase";
import { GetPizzaByIdRepository } from "../../repositories/pizza/get-pizza-by-id.repository";

export class GetPizzaById implements GetPizzaByIdUseCase {
    constructor(private readonly getPizzaByIdRepository: GetPizzaByIdRepository) { }

    async find(id: number): Promise<GetPizzaByIdOutput> {
        const result = await this.getPizzaByIdRepository.find(id)
        if (!result) throw new Error('NOT_FOUND')
        return result
    }
}