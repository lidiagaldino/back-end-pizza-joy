import { UpdateAddress } from "../../../application/services/address/update-address.service";
import { AddressRepository } from "../../../infra/repositories/addresss.repository";
import { YupAdapter } from "../../../infra/yup/yup.adapter";
import { Controller } from "../../../presentation/contracts/controller.contract";
import { UpdateAddressController } from "../../../presentation/controllers/address/update-address.controller";

export const makeUpdateAddressController = (schema: any): Controller => {
    const repository = new AddressRepository()
    const validation = new YupAdapter()
    const loader = new UpdateAddress(repository, repository, validation)
    return new UpdateAddressController(loader, schema)
}
