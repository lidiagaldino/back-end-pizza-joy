import { CreateAddressUseCase } from "../../../domain/usecases/address/create-address.usecase";
import { FindAddressByIdInput, FindAddressByIdOutput, FindAddressByIdUseCase } from "../../../domain/usecases/address/find-address-by-id.usecase";
import { CreateInput, CreateOutput, findByIdInput, findByIdOutput } from "../../models/address.model";
import { Validation } from "../../models/validate.model";
import { CreateAddressRepository } from "../../repositories/address/create-address.repository";
import { FindByIdAddressRepository } from "../../repositories/address/find-address-by-id.repository";

export class FindAddressById implements FindAddressByIdUseCase {
    constructor(
        private readonly findAddressByIdRepository: FindByIdAddressRepository,
    ) { }

    async find(id: findByIdInput): Promise<findByIdOutput> {
        const result = await this.findAddressByIdRepository.find(id)

        if (!result) throw new Error('NOT_FOUND')

        return result
    }


}