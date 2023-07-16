import { CreateAddressUseCase } from "../../../domain/usecases/address/create-address.usecase";
import { FindAddressByIdInput, FindAddressByIdOutput, FindAddressByIdUseCase } from "../../../domain/usecases/address/find-address-by-id.usecase";
import { SearchAddressByClientUseCase } from "../../../domain/usecases/address/search-address-by-client.usecase";
import { CreateInput, CreateOutput, findByIdInput, findByIdOutput, searchByClientInput, searchByClientOutput } from "../../models/address.model";
import { Validation } from "../../models/validate.model";
import { CreateAddressRepository } from "../../repositories/address/create-address.repository";
import { FindByIdAddressRepository } from "../../repositories/address/find-address-by-id.repository";
import { SearchByClientAddressRepository } from "../../repositories/address/search-address-by-client.repository";

export class SearchAddressByClient implements SearchAddressByClientUseCase {
    constructor(
        private readonly searchAddressByClientRepository: SearchByClientAddressRepository,
    ) { }

    async search(id: searchByClientInput): Promise<searchByClientOutput> {
        const result = await this.searchAddressByClientRepository.search(id)

        if (!result) throw new Error('NOT_FOUND')

        return result
    }


}