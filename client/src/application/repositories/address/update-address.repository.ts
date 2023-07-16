import { UpdateInput, UpdateOutput } from "../../models/address.model";

export interface UpdateAddressRepository {
    update(address: UpdateInput, id: number): Promise<UpdateOutput>
}