import { CreateAddress } from "../../../application/services/address/create-address.service";
import { FindAddressById } from "../../../application/services/address/find-address-by-id.service";
import { AddressRepository } from "../../../infra/repositories/addresss.repository";
import { YupAdapter } from "../../../infra/yup/yup.adapter";
import { Controller } from "../../../presentation/contracts/controller.contract";
import { CreateAddressController } from "../../../presentation/controllers/address/create-address.controller";
import { FindAddressByIdController } from "../../../presentation/controllers/address/find-address-by-id.controller";

export const makeFindAddressByIdController = (): Controller => {
    const repository = new AddressRepository()
    const loader = new FindAddressById(repository)
    return new FindAddressByIdController(loader)
}
