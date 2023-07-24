import { GetAllCategoriesOutput, GetAllCategoriesUseCase } from "../../../domain/usecases/category/get-all-categories.usecase";
import { GetAllCategoriesRepository } from "../../repositories/category/get-all-categories.repository";

export class GetAllCategories implements GetAllCategoriesUseCase {
    constructor(
        private readonly getAllCategoriesRepository: GetAllCategoriesRepository
    ) { }

    async show(): Promise<GetAllCategoriesOutput> {
        const result = await this.getAllCategoriesRepository.show()
        if (!result) throw new Error('NOT_FOUND')

        return result
    }
}