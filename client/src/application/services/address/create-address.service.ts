import { CreateAddressUseCase } from "../../../domain/usecases/address/create-address.usecase";
import { CreateInput, CreateOutput } from "../../models/address.model";
import { Validation } from "../../models/validate.model";
import { CreateAddressRepository } from "../../repositories/address/create-address.repository";

export class CreateAddress implements CreateAddressUseCase {
    constructor(
        private readonly createAddressRepository: CreateAddressRepository,
        private readonly validation: Validation,
    ) { }

    async create(address: CreateInput, id: number, schema: any): Promise<CreateOutput> {
        this.validation.validate(schema, address)

        const result = await this.createAddressRepository.insert(address, Number(id))

        return result
    }

}