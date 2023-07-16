import { SearchAddressByClient } from "../../../application/services/address/search-address-by-client.service";
import { AddressRepository } from "../../../infra/repositories/addresss.repository";
import { Controller } from "../../../presentation/contracts/controller.contract";
import { SearchAddressByClientController } from "../../../presentation/controllers/address/search-address-by-client.controller";

export const makeSearchAddressByIdController = (): Controller => {
    const repository = new AddressRepository()
    const loader = new SearchAddressByClient(repository)
    return new SearchAddressByClientController(loader)
}
