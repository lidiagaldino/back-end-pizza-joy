import { CreateAddress } from "../../../application/services/address/create-address.service";
import { AddressRepository } from "../../../infra/repositories/addresss.repository";
import { YupAdapter } from "../../../infra/yup/yup.adapter";
import { Controller } from "../../../presentation/contracts/controller.contract";
import { CreateAddressController } from "../../../presentation/controllers/address/create-address.controller";

export const makeCreateAddressController = (schema: any): Controller => {
    const repository = new AddressRepository()
    const validation = new YupAdapter()
    const loader = new CreateAddress(repository, validation)
    return new CreateAddressController(loader, schema)
}
