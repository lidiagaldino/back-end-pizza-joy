import { FindPizzasSizeOutput, FindPizzasSizeUseCase } from "../../../domain/usecases/pizza-size/find-pizzas-size.usecase";
import { FindPizzasSizeRepository } from "../../repositories/pizza-size/find-pizzas-size.repository";

export class FindPizzaSizes implements FindPizzasSizeUseCase {
    constructor(
        private readonly findPizzaSizeRepository: FindPizzasSizeRepository
    ) { }

    async findPizzaSize(ids: { pizza_id: number; size_id: number; }): Promise<FindPizzasSizeOutput> {
        console.log(ids);
        const result = this.findPizzaSizeRepository.findPizzasSize(ids)

        if (!result) throw new Error('NOT_FOUND')
        return result
    }
}