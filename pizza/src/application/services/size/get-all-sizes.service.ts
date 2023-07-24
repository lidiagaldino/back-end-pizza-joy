import { GetAllSizesOutput, GetAllSizesUseCase } from "../../../domain/usecases/size/get-all-sizes.usecase";
import { GetAllSizesRepository } from "../../repositories/size/get-all-sizes.repository";

export class GetAllSizes implements GetAllSizesUseCase {
    constructor(
        private readonly getAllSizesRepository: GetAllSizesRepository
    ) { }

    async index(): Promise<GetAllSizesOutput> {
        const result = await this.getAllSizesRepository.index()
        if (!result) throw new Error("NOT_FOUND")
        return result
    }
}