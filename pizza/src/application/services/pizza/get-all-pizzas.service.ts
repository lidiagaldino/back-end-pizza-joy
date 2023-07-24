import { GetAllPizzasOutput, GetAllPizzasUseCase } from "../../../domain/usecases/pizza/get-all-pizzas.usecase";
import { GetAllPizzasRepository } from "../../repositories/pizza/get-all-pizzas.repository";

export class GetAllPizzas implements GetAllPizzasUseCase {
    constructor(private readonly getAllPizzasRepository: GetAllPizzasRepository) { }

    async index(): Promise<GetAllPizzasOutput> {
        const result = await this.getAllPizzasRepository.index()
        if (!result) throw new Error('NOT_FOUND')

        return result
    }

}