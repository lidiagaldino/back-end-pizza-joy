import { DeleteSizeUseCase } from "../../../domain/usecases/size/delete-size.usecase";
import { DeleteSizeRepository } from "../../repositories/size/delete-size.repository";
import { FindSizeByIdRepository } from "../../repositories/size/find-size-by-id.repository";

export class DeleteSize implements DeleteSizeUseCase {
    constructor(
        private readonly deleteSizeRepository: DeleteSizeRepository,
        private readonly findSizeByIdRepository: FindSizeByIdRepository
    ) { }

    async delete(id: number): Promise<boolean> {
        const verifyIfExists = await this.findSizeByIdRepository.find(id)
        if (!verifyIfExists) throw new Error('SIZE_NOT_FOUND')

        await this.deleteSizeRepository.delete(id)
        return true
    }
}