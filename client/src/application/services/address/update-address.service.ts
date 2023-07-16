import { UpdateAddressUseCase } from "../../../domain/usecases/address/update-address.usecase"
import { UpdateInput, UpdateOutput } from "../../models/address.model"
import { Validation } from "../../models/validate.model"
import { FindByIdAddressRepository } from "../../repositories/address/find-address-by-id.repository"
import { UpdateAddressRepository } from "../../repositories/address/update-address.repository"

export class UpdateAddress implements UpdateAddressUseCase {
    constructor(
        private readonly updateAddressRepository: UpdateAddressRepository,
        private readonly findAddressByIdRepository: FindByIdAddressRepository,
        private readonly validation: Validation,
    ) { }

    async update(address: UpdateInput, id: number, schema: any): Promise<UpdateOutput> {
        this.validation.validate(schema, address)

        const verify = await this.findAddressByIdRepository.find({ id })
        if (!verify) throw new Error('this address does not exist')

        const result = await this.updateAddressRepository.update(address, Number(id))

        return result
    }

}