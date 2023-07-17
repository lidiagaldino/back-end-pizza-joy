import { DeleteAddressUseCase } from "../../../domain/usecases/address/delete-address.usecase";
import { DeleteAddressRepository } from "../../repositories/address/delete-address.repository";
import { FindByIdAddressRepository } from "../../repositories/address/find-address-by-id.repository";

export class DeleteAddress implements DeleteAddressUseCase {
    constructor(
        private readonly findAddressByIdRepository: FindByIdAddressRepository,
        private readonly deleteAddressRepository: DeleteAddressRepository,
    ) { }

    async delete(id: number): Promise<boolean> {
        const verify = await this.findAddressByIdRepository.find({ id: Number(id) })
        if (!verify) throw new Error('NOT_FOUND')

        const result = await this.deleteAddressRepository.delete(id)

        return result
    }

}