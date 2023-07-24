import { GetResult } from "@prisma/client/runtime";
import { FindPizzaByCategoryOutput, FindPizzaByCategoryUseCase } from "../../../domain/usecases/category/find-pizza-by-category.usecase";
import { FindPizzaByCategoryRepository } from "../../repositories/category/find-pizza-by-category.repository";
import { findByCategoryOutput } from "../../model/category.model";

export class FindPizzaByCategory implements FindPizzaByCategoryUseCase {
    constructor(
        private readonly findPizzaByCategoryRepository: FindPizzaByCategoryRepository
    ) { }

    async findPizza(id: number): Promise<FindPizzaByCategoryOutput> {
        const result = await this.findPizzaByCategoryRepository.findPizza(id)

        if (!result) throw new Error('NOT_FOUND')
        return result
    }
}