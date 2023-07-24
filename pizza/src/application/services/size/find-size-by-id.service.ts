import { SizeProps } from "../../../domain/entities/size.entity";
import { GetSizesByIdUseCase } from "../../../domain/usecases/size/find-sizes-by-id.usecase";
import { FindSizeByIdRepository } from "../../repositories/size/find-size-by-id.repository";

export class FindSizeById implements GetSizesByIdUseCase {
    constructor(
        private readonly findSizeByIdRepository: FindSizeByIdRepository,
    ) { }

    async show(id: number): Promise<SizeProps> {
        const result = await this.findSizeByIdRepository.find(id)

        return result
    }
}