import { FindPizzaBySizeOutput, FindPizzaBySizeUseCase } from "../../../domain/usecases/pizza-size/find-pizza-by-size.usecase";
import { FindPizzaBySizeRepository } from "../../repositories/pizza-size/find-pizza-by-size.repository";

export class FindPizzaBySize implements FindPizzaBySizeUseCase {
    constructor(
        private readonly findPizzaBySizeRepository: FindPizzaBySizeRepository
    ) { }

    async findBySize(size_id: number): Promise<FindPizzaBySizeOutput> {
        const result = await this.findPizzaBySizeRepository.findBySize(size_id)

        if (!result) throw new Error('NOT_FOUND')
        return result
    }
}