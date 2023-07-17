import { CreateAddress } from "../../../application/services/address/create-address.service";
import { DeleteAddress } from "../../../application/services/address/delete-address.service";
import { AddressRepository } from "../../../infra/repositories/addresss.repository";
import { YupAdapter } from "../../../infra/yup/yup.adapter";
import { Controller } from "../../../presentation/contracts/controller.contract";
import { CreateAddressController } from "../../../presentation/controllers/address/create-address.controller";
import { DeleteAddressController } from "../../../presentation/controllers/address/delete-address.controller";

export const makeDeleteAddressController = (): Controller => {
    const repository = new AddressRepository()
    const loader = new DeleteAddress(repository, repository)
    return new DeleteAddressController(loader)
}
